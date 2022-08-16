export default function shuffleArray(arr) {
    const shuffled = [];
    arr = [...arr];
    while (arr.length > 0) {
        const pickIdx = Math.floor(Math.random() * arr.length);
        shuffled.push(arr[pickIdx]);
        arr.splice(pickIdx, 1);
    }
    return shuffled;
}
