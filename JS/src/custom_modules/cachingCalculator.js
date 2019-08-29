import { StringCalculator } from './stringCalculator'

export const cachingCalculator = () => {
    let cache = {};

    return (operation) => {
      if (operation in cache) {
        console.log('Fetching from cache');

        return cache[operation];
      }
      else {
        console.log('Calculating result');
    
        let result = StringCalculator.doEvil(operation);
        cache[operation] = result;
        
        return result;
      }
    }
}