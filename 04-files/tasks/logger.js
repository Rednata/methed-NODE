import { EventEmitter } from 'node:events';
import { appendFile, stat, copyFile, open } from 'node:fs/promises';
import path from 'path'

export class Logger extends EventEmitter {
  constructor(filename, maxSize) {
    super();
    this.filename = filename;
    this.maxSize = maxSize;
    this.logQuery = [];
    this.writing = false;
  }

  emit(name, ...args) {
    super.emit(name, ...args)
  }

  log(message) {
    // Почему сообщение должно добавляться в началоа logQueue ???
    this.logQuery.unshift(message)
    if (!this.writing) {
      this.writeLog()
      this.writing = true;
    }
  }

  async writeLog() {
    const log = this.logQuery.pop();
    try {
      await appendFile(this.filename, `${new Date().toISOString()} ${log}\n`);
      this.emit('messageLogged', log)
      this.checkFileSize()
    } catch (error) {
      console.log(`Ошибка записи в файл ${this.filename}`, error);
    }

    if (this.logQuery.length) {
      this.writeLog()
    } else {
      this.writing = false;
    }
  }

  async checkFileSize() {
    const size = await this.getFileSize()
    if (size > this.maxSize) {
      this.rotateLog()
    }
  }

  async getFileSize() {
    try {
      const stats = await stat(this.filename);
      return stats.size;
    } catch (error) {
      console.log(`Ошибка получения размера файла ${this.filename}`, error);
      return 0;
    }
  }

  /**
   * Создаем имя файла-копии, равное имени файла-лога, но с расширением '.bak'
   * Размещаем файл.bak в той же директории, что и файл-лог
   * Копируем данные из файла-лога в файл.bak
   */
  async rotateLog() {
    const pathDir = path.dirname(this.filename)
    const fileName = path.basename(this.filename).split('.').slice(0, -1);
    const bakName = `${fileName}.bak`;
    let filehandle = null;
    try {
      await copyFile(this.filename, `${pathDir}/${bakName}`);

      filehandle = await open(this.filename, 'r+');
      await filehandle.truncate(this.maxSize);
    } catch (error) {
      console.log('error: ', error);
    } finally {
      await filehandle?.close();
    }
  }
};




