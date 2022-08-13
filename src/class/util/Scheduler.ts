type SchedulerTaskTimes = [startedAt: number, delay: number, interval: number, totalCallCount: number];
export type SchedulerFunction = (repeatCount: number) => void;
type SchedulerTask = [callback: SchedulerFunction, times: SchedulerTaskTimes];

export default class Scheduler {
  private _time: number = 0;
  private tasks: SchedulerTask[] = [];
  
  constructor() {
  }
  
  tick(dt: number) {
    this._time += dt;
    const time = this._time;
    for (const task of this.tasks) {
      const [callback, [startedAt, delay, interval, totalCallCount]] = task;
      const nextCallTime = startedAt + delay + interval * totalCallCount;
      if (time < nextCallTime) continue;
      const callCount = interval > 0 ? Math.floor((time - nextCallTime) / interval) + 1 : 1;
      for (let i = 0; i < callCount; i++) {
        callback(totalCallCount + i);
      }
      task[1][3] += callCount;
    }
  }

  addSchedule(callback: SchedulerFunction, delay: number, interval: number) {
    const task: SchedulerTask = [
      callback,
      [this._time, delay, interval, 0]
    ];
    this.tasks.push(task);

    return this;
  }

  get time() {
    return this._time;
  }

  restart() {
    this._time = 0;
  }

  clearSchedule() {
    this.tasks = [];
  }
}
