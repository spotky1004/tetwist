// https://tetris.wiki/Super_Rotation_System
function deepcloneKicktests(kicktableData) {
    return [...kicktableData.map(kicktest => [...kicktest])];
}
export default class Kicktable {
    constructor(datas) {
        this.datas = new Map();
        let state;
        for (state in datas) {
            this.datas.set(state, deepcloneKicktests(datas[state]));
        }
    }
    getKicktests(convention) {
        const stateFrom = convention[0];
        const stateTo = convention[1];
        const kicktests1 = this.datas.get(stateFrom);
        const kicktests2 = this.datas.get(stateTo);
        if (!kicktests1 ||
            !kicktests2)
            return [];
        const kicktests = [];
        for (let i = 0; i < Math.min(kicktests1.length, kicktests2.length); i++) {
            const [x1, y1] = kicktests1[i];
            const [x2, y2] = kicktests2[i];
            kicktests.push([x1 - x2, -(y1 - y2)]);
        }
        return deepcloneKicktests(kicktests);
    }
}
