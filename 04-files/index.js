import { copyDir } from './tasks/copyDir.js';

copyDir('./files', './newDi', (result) => console.log('result: ', result));

