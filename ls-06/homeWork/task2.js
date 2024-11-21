import { createReadStream, createWriteStream, ReadStream } from 'node:fs';
import { readdir } from 'node:fs/promises';

const getFiles = async(pathDir) => {
  try {
    return (await readdir(pathDir)).filter(elem => elem.slice(-3) === 'txt');
  } catch (error) {
  }
}

export const copyFile = async (pathDir, sourceOut) => {
  try {
    const files = await getFiles(pathDir)
    console.log(' files: ',  files);
    const wStream = createWriteStream(sourceOut)

    files.forEach(file => {
      const rStream = createReadStream(`${pathDir}/${file}`);
      rStream.on('data', chunk => {
        wStream.write(`[=== ${file} ===]\n`);
        wStream.write(chunk)
      })
    })
  } catch (error) {
    console.log('error: ', error);
  }
}

export const anyFunc = async (pathDir, sourceOut) => {
  try {

    const writeableStream = createWriteStream("hello.txt");
    writeableStream.write("Привет мир!\n");
    writeableStream.write("Продолжение записи\n");
    writeableStream.end("Завершение записи\n");

    const readableStream = createReadStream("hello.txt");
    let i = 0
    readableStream.on("data", function(chunk){
      i++
      console.log(i, chunk.toString());
    });

    let count = 0;
    const filesList = (await readdir(pathDir)).filter(elem => elem.slice(-3) === 'txt');
    console.log('filesList: ', filesList);


    const sWritable = createWriteStream(sourceOut)


    filesList.forEach(file => {
      const sReadable = createReadStream(`${pathDir}/${file}`)
      sReadable.on('data', (chunk) => {
        count++
        console.log('file: ', count, file);
        sWritable.write(`[${file}]\n`)
        sWritable.write(`${chunk}\n`)

      })
    })

  } catch (error) {
    console.log('error: ', error);

  }

}
