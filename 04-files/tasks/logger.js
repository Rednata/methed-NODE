import { EventEmitter } from 'node:events';
import { appendFile, stat, copyFile, open, access, readFile } from 'node:fs/promises';
import path from 'path'

export class Logger extends EventEmitter {
  constructor(filename, maxSize) {
    super();
    this.filename = filename;
    this.maxSize = maxSize;
    this.logQuery = [];
    this.writing = false;
    this.bakName = this.getBakName();
  }

  getBakName() {
    const pathDir = path.dirname(this.filename)
    const fileName = path.basename(this.filename).split('.').slice(0, -1);
    return `${pathDir}/${fileName}.bak`;
  }
  emit(name, ...args) {
    super.emit(name, ...args)
  }

  log(message) {
    this.logQuery.unshift(message)
    if (!this.writing) {
      this.writeLog()
      this.writing = true;
    }
  }

  async writeLog() {
    this.logQuery.forEach(async log => {
      try {
        await appendFile(this.filename, `${new Date().toISOString()} ${log}\n`)
        this.emit('messageLogged', log)
        this.checkFileSize()
        this.logQuery = this.logQuery.filter(elem => elem !== log);
        if (!this.logQuery.length) this.writing = false;
      } catch (error) {
        console.log(`Ошибка записи в файл ${this.filename}`, error);
      }
    })
  }

  async checkFileSize() {
    try {
      const stats = await stat(this.filename);
      if (stats.size > this.maxSize) this.rotateLog()
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
    let filehandle = null;
    try {
      await access(this.bakName)
      const dataFileLog = await readFile(this.filename);
      await appendFile(this.bakName, dataFileLog);
      filehandle = await open(this.filename, 'r+');
      await filehandle.truncate(0);
    } catch (error) {
      console.log('error: ', error);
      await copyFile(this.filename, this.bakName);
    } finally {
      await filehandle?.close();
    }
  }
};
