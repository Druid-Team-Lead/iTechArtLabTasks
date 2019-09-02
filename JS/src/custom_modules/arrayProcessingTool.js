export class ArrayPrecessingTool {

    constructor(array) {
        this._array = this._arrayFormatter(array);
    }

    getMaxSubSum_On2() {
        let sum = 0;
        let max = 0;
        
        for (let i = 0; i < this._array.length; i++) {   
            for(let j = i; j < this._array.length; j++) {

                sum += this._array[j];

                if(sum > max) {
                    max = sum;
                }
            }
            sum = 0;
        }

        return max;
    }

    getMaxSubSum_On() {
        let tmp = 0;
        let max = this._array[0];

        this._array.forEach((element) => {
            tmp = Math.max(element, tmp + element);
            max = Math.max(max, tmp);
        })

        return max < 0 ? 0 : max;
    }

    searchMax() {
        return Math.max(...this._array);
    }

    searchMin() {
        return Math.min(...this._array);
    }

    searchMedian() {
        /* 
        Return the number at the midpoint of length is odd, 
        otherwise the average of the two middle numbers.
        */
        const mid = Math.floor(this._array.length / 2);
        const sortedArray = [...this._array].sort((a, b) => a - b);
        const median = this._array.length % 2 !== 0 ?
         sortedArray[mid] : (sortedArray[mid-1]) + sortedArray[mid] / 2; 

        return median;
    }

    getMaximumSequence() {
        let sliceFrom = 0;
        let sliceTo;
        let max = Number.NEGATIVE_INFINITY;
        let dictionary = new Array();

        for(let i = 0; i < this._array.length; i ++) {
            if(this._array[i] > max) {
                max = this._array[i];
                sliceTo = i;
            } else {
                dictionary.push(this._array.slice(sliceFrom, sliceTo + 1));
                sliceFrom = i;
                max = this._array[i];
            }
        }
        dictionary.push(this._array.slice(sliceFrom, sliceTo + 1));

        let maxSum = 0
        let index = 0;
        for(let i in dictionary) {
            let seqSum = dictionary[i].reduce((a, b) => a + b, 0);
            if(seqSum > maxSum) {
                index = i;
                maxSum = seqSum;
            }
        }
        const sequance = dictionary[index];

        return sequance;
    }

    _arrayFormatter(array) {
        const regex = array.replace(/[^0-9.-]+/g, " ");
        const dirtyResult = regex.split(" ").map(function(item) {
            return parseInt(item);
        });
        const result = dirtyResult.filter(function (value) {
            return !Number.isNaN(value) && value != null;
        });

        return result;
    }
}