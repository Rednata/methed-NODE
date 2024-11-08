import { EventEmitter } from 'node:events';

class Messenger extends EventEmitter{}

const messenger = new Messenger();

export const sendMessage = ({name, message}) => {
  messenger.emit('send', ({name, message}))
}

const receiveMessage = (obj) => {
  console.log('userComment: ', obj);
}

messenger.on('send', receiveMessage)
