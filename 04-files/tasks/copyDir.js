import fs from 'node:fs/promises';

const getIsDirectory = async (sourceDir, path) => {
  try {
    return (await fs.stat(`${sourceDir}/${path}`)).isDirectory();
  } catch (error) {
    callback(error)
  }
}

const createDirectory = async (targetDir, path, callback) => {
  try {
    await fs.mkdir(`${targetDir}/${path}`, {recursive: true});
  } catch (error) {
    callback(error)
  }
}

const copy = async (sourceDir, path, targetDir, callback) => {
  try {
    await fs.copyFile(`${sourceDir}/${path}`, `${targetDir}/${path}`);
  } catch (error) {
    callback(error)
  }
}

const getSources = async (sourceDir, callback) => {
  try {
    return await fs.readdir(sourceDir)
  } catch (error) {
    callback(error)
  }
}
export const copyDir = async (sourceDir, targetDir, callback) => {
  try {
    const result = await getSources(sourceDir, callback)
    result.forEach(async path => {
      const isDirectory = await getIsDirectory(sourceDir, path, callback);
      if (isDirectory) {
        createDirectory(targetDir, path, callback)
        copyDir(`${sourceDir}/${path}`, `${targetDir}/${path}`, callback)
      } else {
        copy(sourceDir, path, targetDir, callback)
      }
    })
  } catch (error) {
    callback(error)
  }
  callback(null);
}

//  Надо ли где-то еще ставить Try/catch ???
// callback (null) срабатывает несколько раз из-за вложенных папок. Не могу сообразить, как сделать чтобы был только один вызов
