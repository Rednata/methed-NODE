import { copyDir } from './tasks/copyDir.js';
import { Logger } from './tasks/logger.js';

// copyDir('./files', './newDir', (result) => console.log('result: ', result));

const logger = new Logger('./files/log.txt', 200);

logger.on('messageLogged', (message) => {
  console.log('Записано сообщение:', message);
})

// setTimeout(() => {
//   logger.log('1message ')
// }, 1000)
// setTimeout(() => {
//   logger.log('2222222222222222222222222message')
//   logger.log('message 2')
// }, 1200)


