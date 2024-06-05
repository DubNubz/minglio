
export function delay (ms: number) {
    return new Promise((executor: any) => setTimeout(executor, ms));
}
  
export function getRandomIntInclusive (min: number, max: number) {
    const minCeiled: number = Math.ceil(min);
    const maxFloored: number = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export function getRandomItemFromArray (arr: any[]) {
    return arr[getRandomIntInclusive(0, arr.length - 1)];
}
