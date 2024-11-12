import { readdir, mkdir, copyFile, unlink, rm, access, watch } from 'node:fs/promises';
import fs from 'node:fs/promises';

import { readText } from './modules/readText.js';
import { write } from './modules/write.js';

// fs.readFile('./files/text.txt', 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log('result: ', data);

//   fs.writeFile('./files/result1.txt', data, err => {
//     if (err) throw err;
//     console.log('Файл был записан');

//     fs.rename('./files/result1.txt', './resultNew.txt', err => {
//       if (err) throw err;
//       console.log('Файл был перемещен');
//     })
//   });
// });

const app2 = async () => {
  try {
    readdir('./files')
      .then(async files => {
        await mkdir('./newFolder', {recursive: true})
        console.log('Папка создана');
        return files
      })
      .then(files => {
        files.forEach(async file => {
          console.log('file: ', file);
          await copyFile(`./files/${file}`, `./newFolder/${file}`)
          console.log(file, '- файл скопирован')
        })
      })
      setTimeout(async () => {
        await rm(`./newFolder`, {recursive: true});
        console.log('Папка был удален')
      }, 3000)

      setTimeout(async () => {
        access(`./newFolder`)
          .then(() => {
            rm(`./newFolder`, {recursive: true});
          })
          .then(() => {console.log('Папка был удален')})
          .catch(() => {
            console.log('Папки нет');
          })
      }, 5000)

  } catch (e) {
    console.error('error: ', e);
  }
}

// app2();
console.log('App start');

// const app = async () => {
//   try {
//     const text = await readText('./files/text.txt')
//     await write('./files/resultAsync.txt', text.toUpperCase())
//     console.log('Операция завершена');

//   } catch (error) {
//       console.log(error);
//   }
// }

// app()

const watcherStart = async(path) => {
  try {
    let date = 0;
    const changes = [];

    const watcher = watch(path);

    for await (const { eventType, filename } of watcher) {
      if (Date.now() - date > 100) {
        date = Date.now();

        changes.push({ date, eventType, filename })
        console.log('\x1Bc');

        changes.forEach(({ date, eventType, filename }) => {
          console.log(`${new Date(date).toISOString()}: ${eventType} - ${filename}`);
        })
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// watcherStart('./files');

const checkFileStats =  async (path) => {
  try {
    const stats = await fs.stat(path);
    console.log('stats: ', stats);
    const statPath = {
      'Файл или папка': path,
      'Размер файла в байтах': stats.size,
      'Дата создания файла': stats.birthtime,
      'Дата последнего изменения': stats.mtime,
    }
    if (stats.isFile()) {
      statPath.type = 'Это файл';
    } else if (stats.isDirectory()) {
      statPath.type = 'Это директория';
    } else {
      statPath.type = 'эТо неизвестный тип';
    }
    console.log(statPath);
  } catch (err) {
    console.log('Ошибка получения информации о файле', err.message);
  }
}

checkFileStats('./files/text.txt');


const appendToFile = async (filePath, data) => {
  try {
    await fs.appendFile(filePath, data);
    console.log('Запись в файл была успешна');
  } catch (error) {
    console.error('Ошибка при записи в файл', error);

  }
}

appendToFile('./files/text.txt', `${new Date().toISOString()}, Допиши текст 1\n`)

setTimeout(() => {
  appendToFile('./files/text.txt', `${new Date().toISOString()}, Допиши текст 2\n`)
}, 2000)
setTimeout(() => {
  appendToFile('./files/text.txt', `${new Date().toISOString()}, Допиши текст 3\n`)
}, 4000)
setTimeout(() => {
  appendToFile('./files/text.txt', `${new Date().toISOString()}, Допиши текст 4\n`)
}, 6000)

