export class ArrayPrecessingTool {

    getMaxSubSum_On2(input) {

        const array = input.split(" ").map(function(item) {
            return parseInt(item);
        });
        let sum = 0;
        let max = 0;
        let firstIndex;
        let lastIndex;
        
        for (let i = 0; i < array.length; i++) {   

            for(let j = i; j < array.length; j++) {

                sum += array[j];

                if(sum > max) {
                    firstIndex = i;
                    lastIndex = j;
                    max = sum;
                }
            }
            sum = 0;
        }

        const subarray = array.slice(firstIndex, lastIndex + 1);
        return {
            subarraySum: max,
            subarray
        };
    }

    getMaxSubSum_On(input) {
        console.log("Sub Sum O(n)");
    }

    _arrayFormatter(array) {
        return 0;
    }
}