// https://tetris.wiki/Super_Rotation_System

export type State = "0" | "R" | "L" | "2";
export type AnyConvention = `${State}${State}`;
const vaildConventions = ["0R", "R0", "R2", "2R", "2L", "L2", "L0", "0L"] as const;
export type Convention = Extract<AnyConvention, typeof vaildConventions[number]>;

type KickTests = [xOffset: number, yOffset: number][];
export type KicktableData = { [K in Convention]: KickTests };
type KicktableMap = Map<Convention, KickTests>;

export function isVaildConvention(anyConvention: AnyConvention): anyConvention is Convention {
  return vaildConventions.includes(anyConvention as any);
}

function deepcloneKicktests(kicktableData: KickTests): KickTests {
  return [...kicktableData.map(kicktest => [...kicktest] as [number, number])]
}

export default class Kicktable {
  readonly datas: KicktableMap;

  constructor(datas: KicktableData) {
    this.datas = new Map();
    let conventions: Convention;
    for (conventions in datas) {
      this.datas.set(
        conventions,
        deepcloneKicktests(datas[conventions])
      );
    }
  }

  getKicktests(convention: Convention) {
    const kicktests = this.datas.get(convention);
    if (!kicktests) return [];
    return deepcloneKicktests(kicktests);
  }
}
