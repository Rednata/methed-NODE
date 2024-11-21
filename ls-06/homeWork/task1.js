export const textToBuffer = (text, encoding) => {
  return Buffer.from(text, encoding);
}

export const bufferToText = (bufferText, encoding) => {
  return bufferText.toString(encoding);
}
