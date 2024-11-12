import fs from 'node:fs/promises';

const getIsDirectory = async (sourceDir, path) => {
  return (await fs.stat(`${sourceDir}/${path}`)).isDirectory();
}

const createDirectory = async (targetDir, path) => {
  await fs.mkdir(`${targetDir}/${path}`, {recursive: true})
}

const copy = async (sourceDir, path, targetDir) => {
  await fs.copyFile(`${sourceDir}/${path}`, `${targetDir}/${path}`)
}

export const copyDir = (sourceDir, targetDir, callback) => {
  fs.readdir(sourceDir)
    .then(result => {
      result.forEach(async path => {
        const isDirectory = await getIsDirectory(sourceDir, path);
        if (isDirectory) {
          createDirectory(targetDir, path)
          copyDir(`${sourceDir}/${path}`, `${targetDir}/${path}`, callback)
        } else {
          copy(sourceDir, path, targetDir)
        }
      })
    })
    .catch(err => callback(err))
}

