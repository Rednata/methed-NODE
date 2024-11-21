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

