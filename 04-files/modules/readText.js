import fs from 'node:fs/promises';

export const readText = async (pathFile) => {
  try{
    const result = await fs.readFile(pathFile, 'utf8')
    // console.log('result: ', result);
    return result
  }
  catch(err) {
    console.error(`Ошибка: ${err.message}`)
  }
}
