export default function two_crystal_balls(breaks: boolean[]): number {
    let index = 0;
    while (index < breaks.length) {
        if (breaks[index]) {
            index -= Math.sqrt(breaks.length);
            while (!breaks[index]) {
                index++;
            }
            return index;
        }
        index += Math.sqrt(breaks.length);
    }
    return -1
}
