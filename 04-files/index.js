import { copyDir } from './tasks/copyDir.js';
import { Logger } from './tasks/logger.js';

// Раскомментировать для проверки работы функции копирования директории:
// copyDir('./files', './newDir', (result) => console.log('result: ', result), true);

const logger = new Logger('./files/log.txt', 200);

logger.on('messageLogged', (message) => {
  console.log('Записано сообщение:', message);
})

// Раскомментировать для проверки работы функции Logger (или написать свои вызовы logger.log(message)):
// for (let i = 1; i < 10; i++) {
//   setTimeout(() => {
//     logger.log(`message ${i}`)
//   }, i * 1000)
// }



