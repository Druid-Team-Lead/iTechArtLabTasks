export class ArrayPrecessingTool {

    getMaxSubSum_On2(input) {
        const array = this._arrayFormatter(input);
        let sum = 0;
        let max = 0;
        
        for (let i = 0; i < array.length; i++) {   

            for(let j = i; j < array.length; j++) {

                sum += array[j];

                if(sum > max) {
                    max = sum;
                }
            }
            sum = 0;
        }

        return max;
    }

    getMaxSubSum_On(input) {
        console.log("Sub Sum O(n)");

        const array = this._arrayFormatter(input);
        let tmp = 0;
        let max = array[0];

        array.forEach((element) => {
            tmp = Math.max(element, tmp + element);
            max = Math.max(max, tmp);
        })

        return max < 0 ? 0 : max;
    }

    searchMax(input) {

    }

    searchMin(input) {

    }

    searchMedium(input) {

    }

    _arrayFormatter(array) {
        const result = array.split(", ").map(function(item) {
            return parseInt(item);
        });
        return result;
    }
}