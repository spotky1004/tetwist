// https://tetris.wiki/Super_Rotation_System

export type State = "0" | "R" | "L" | "2";
export type Convention = `${State}${State}`;

type KickTests = [xOffset: number, yOffset: number][];
export type KicktableData = { [K in State]: KickTests };
type KicktableMap = Map<State, KickTests>;

function deepcloneKicktests(kicktableData: KickTests): KickTests {
  return [...kicktableData.map(kicktest => [...kicktest] as [number, number])]
}

export default class Kicktable {
  readonly datas: KicktableMap;

  constructor(datas: KicktableData) {
    this.datas = new Map();
    let state: State;
    for (state in datas) {
      this.datas.set(
        state,
        deepcloneKicktests(datas[state])
      );
    }
  }

  getKicktests(convention: Convention) {
    const stateFrom: State = convention[0] as State;
    const stateTo: State = convention[1] as State;
    const kicktests1 = this.datas.get(stateFrom);
    const kicktests2 = this.datas.get(stateTo);
    if (
      !kicktests1 ||
      !kicktests2
    ) return [];
    const kicktests: KickTests = [];
    for (let i = 0; i < Math.min(kicktests1.length, kicktests2.length); i++) {
      const [x1, y1] = kicktests1[i];
      const [x2, y2] = kicktests2[i];
      kicktests.push([x1 - x2, -(y1 - y2)]);
    }
    return deepcloneKicktests(kicktests);
  }
}
