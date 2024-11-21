import { read } from '../modules/read.js';
import { write } from '../modules/write.js';

export const buffer = async () => {
  try {
    // const bufferUnsafe = Buffer.allocUnsafe(1024);
    // console.log('bufferUnsafe: ', bufferUnsafe);

    // const bufferSafe = Buffer.alloc(1024, 'Hello Buffer');
    // console.log('bufferSafe: ', bufferSafe);

    // const data = await read('./files/file1.txt');
    // console.log(' data: ',  data );

    // await write('./files/buffer.txt', bufferSafe)

    // const buffer = Buffer.allocUnsafe(3);
    // buffer.write('!!!')

    // const bufferArr1 = Buffer.from([16])
    // const bufferArr2 = Buffer.from([12])

    // const bufferArr = Buffer.concat([bufferArr1, bufferArr2])
    // console.log('bufferArr : ', bufferArr );

    const bufferStr = Buffer.from('Изучаем Buffer в Node.js')
    console.log('bufferStr: ', bufferStr);

    console.log(bufferStr.toString('utf-8', 15, 19));
    console.log(bufferStr.indexOf('Node'));
    console.log(bufferStr.toString('utf-8', bufferStr.indexOf('Node')));

    const n = bufferStr.indexOf('Node');
    console.log(bufferStr.toString('utf-8', n, n + 5));

    console.log(bufferStr.indexOf('sdfsf'));
    console.log(bufferStr.includes('aff'));

    console.log(bufferStr.subarray(25).toString());

    console.log(bufferStr.toJSON());

    console.log(Buffer.isBuffer('bufferStr'));



    await write('./files/buffer.txt', bufferStr)
    console.log('Done');

  } catch (error) {
    console.log('error: ', error);
  }
}
