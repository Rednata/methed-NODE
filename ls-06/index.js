import { bufferToText, textToBuffer } from './homeWork/task1.js';
import { copyFile } from './homeWork/task2.js';

const app = async () => {
  try {
    // ========= Task1 ===========
    // const text = 'Привет, мир!'
    // const utf8Buffer = textToBuffer(text, 'utf8')
    // console.log(' utf8Buffer: ',  utf8Buffer);
    // const decodeText =  bufferToText(utf8Buffer, 'utf8')
    // console.log('decodeText: ', decodeText);

    // ========== Task2 =============
    copyFile('./files', './file.txt')



  } catch (error) {
    console.log('error: ', error);

  }
}

app()

