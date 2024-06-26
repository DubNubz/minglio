
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

export function compareObjectsSingle(obj1: Record<any, any> | undefined, obj2: Record<any, any> | undefined) {
    if (!obj1 || !obj2) return;

    if (obj1 === obj2) {
      return true;
    }
  
    if (obj1 == null || obj2 == null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
      return false;
    }
  
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (let key of keys1) {
      if (!keys2.includes(key) || !compareObjectsSingle(obj1[key], obj2[key])) {
        return false;
      }
    }
  
    return true;
  }
  