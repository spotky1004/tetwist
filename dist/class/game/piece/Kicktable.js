// https://tetris.wiki/Super_Rotation_System
const vaildConventions = ["0R", "R0", "R2", "2R", "2L", "L2", "L0", "0L"];
export function isVaildConvention(anyConvention) {
    return vaildConventions.includes(anyConvention);
}
function deepcloneKicktests(kicktableData) {
    return [...kicktableData.map(kicktest => [...kicktest])];
}
export default class Kicktable {
    constructor(datas) {
        this.datas = new Map();
        let conventions;
        for (conventions in datas) {
            this.datas.set(conventions, deepcloneKicktests(datas[conventions]));
        }
    }
    getKicktests(convention) {
        const kicktests = this.datas.get(convention);
        if (!kicktests)
            return [];
        return deepcloneKicktests(kicktests);
    }
}
