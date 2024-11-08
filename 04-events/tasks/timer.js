import { EventEmitter } from 'node:events';

class TickEvent extends EventEmitter {
  constructor() {
    super();
    this.tick = 0
  }
};

const tick = new TickEvent()

tick.on('tick', () => {
  tick.tick++;
  console.log(`Tick - ${tick.tick}`)
});

export const timer = () => {
  setInterval(() => {
    tick.emit('tick')
  }, 1000);
}
