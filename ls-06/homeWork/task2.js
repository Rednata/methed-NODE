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

    const readStream = async (file) => {
      const stream = createReadStream(`${pathDir}/${file}`)
      let result = '';
      for await (const chunk of stream) {
        result += chunk
      }
      wStream.write(`[=== ${file} ===]\n`);
      wStream.write(result)
    }

    files.forEach(file => {
      readStream(file)
    })

  } catch (error) {
    console.log('error: ', error);
  }
}

