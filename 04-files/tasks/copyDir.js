import fs from 'node:fs/promises';

const checkIsDirectory = async (sourceDir, path) => {
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

export const copyDir = async (sourceDir, targetDir, callback, flag) => {
  try {
    const result = await getSources(sourceDir, callback)
    result.forEach(async path => {
      const isDirectory = await checkIsDirectory(sourceDir, path, callback);
      if (isDirectory) {
        createDirectory(targetDir, path, callback)
        copyDir(`${sourceDir}/${path}`, `${targetDir}/${path}`, callback, false)
      } else {
        copy(sourceDir, path, targetDir, callback)
      }
    })
  } catch (error) {
    callback(error)
  }
  if (flag === true) {
    callback(null);
  }
}
