import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

export const stream = async () => {
  const wStream = createWriteStream('./write.txt')

  wStream.on('pipe', () => {
    console.log('PIPE - подключение к readable стриму');
  })

  wStream.on('unpipe', () => {
    console.log('UNPIPE - отключение от readable стрима');
  })

  wStream.on('finish', () => {
    console.log('FINISH - запись завершилась');
  })

  wStream.on('drain', () => {
    wStream.write('\n============ освободился буфер у writable================\n');
    console.log('DRAIN - освободился буфер у writable');
  })

  wStream.on('error', (err) => {
    console.log('ERROR - ', err);
  })

  wStream.on('close', (err) => {
    console.log('CLOSE - стрим закрыт');
  })

  // wStream.write('Записываем данные\n')

  // const buffer = Buffer.from('Буфер')

  // wStream.write(`${buffer}\n`, 'utf8', () => {
  //   console.log('Данные записываются')
  //   }
  // );

  // const rStream = createReadStream('../ls-06/files/file1.txt');
  // const rStream = createReadStream('../ls-06/files/read.txt');

  // rStream.on('data', (chunk) => {
  //   console.log('====== data ===========');
  //   console.log('chunk: ', chunk);
  //   wStream.write(chunk)

  // })

  // rStream.on('end', () => {
  //   console.log('===== end ====');
  //   wStream.close()
  // })


  // rStream.on('error', (err) => {
  //   console.log('=========== error ============');
  //   console.log(err);
  //   console.log('=========== error ============');
  // })

  // rStream.on('close', () => console.log('==close=='))

  // const readStream = async path => {
  //   const stream = createReadStream(path);
  //   for await (const chunk of stream) {
  //     console.log('=========== chunk ========');

  //     console.log('chunk: ', chunk.toString());
  //   }
  // }

  // readStream('../ls-06/files/read.txt')

  const copy = async(from, to) => {
    try {
      await pipeline(
        createReadStream(from),
        createWriteStream(to),
      )
      console.log('======= ready ========');
    } catch (error) {
      console.log('error: ', error);
    }
  }

  copy('../ls-06/files/read.txt', './write.txt')
}


