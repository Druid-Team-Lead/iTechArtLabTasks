export class ArraySorter {

    constructor(input) {
        this._array = this._arrayFormatter(input);
    }

    sort() {
        const sortType =  Math.floor(Math.random() * 5) + 1;
		switch(sortType) {
            case 1: {
                return this._quickSort(this._array, 0, this._array.length - 1);
            }
            case 2: {
                return this._shellSort(this._array);
            }
            case 3: {
                return this._simpleInclusionSort(this._array);
            }
            case 4: {
                return this._simpleSelectionSort(this._array);
            }
            case 5: {
                return this._bubbleSort(this._array);
            }   
        }
    }

    _quickSort(array, left, right) {
        let i = left;
        let j = right;
        let index = Math.trunc((left + right) / 2)
        let sr = array[index];

        do {
            while(array[i] > sr) { ++i; }
            while(array[j] < sr) { --j; }
            if(i <= j) {

                [array[i], array[j]] = [array[j], array[i]];

                ++i;
                --j;
            }
        } while(i <= j);

        if(i < right) { this._quickSort(array, i, right) }
        if(j > left) { this._quickSort(array, left, j) }

        return array;
    }

    _shellSort(array) {
        const size = array.length - 1;
        let tmp;
        for(let k = Math.floor(size / 2); k > 0; k = Math.floor(k/2)) {
            do {
                tmp = 0;
                for(let i = 0, j = k; j < size; i++, j++) {
                    if(array[i] > array[j]) {
                        [array[i], array[j]] = [array[j], array[i]];
                        tmp++;
                    }
                }
            } while(tmp);
        }

        return array;
    }

    _simpleInclusionSort(array) {
        const size = array.length;
        let tmp;
        let j;

        for(let i = 1; i < size; i++) {
            tmp = array[i];
            j = i - 1;
            while(tmp > array[j] && j >= 0) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = tmp;
        }

        return array;
    }

    _simpleSelectionSort(array) {
        const size = array.length;
        let k = 0;

        for(let i = 0; i < size - 1; i++) {
            k = i;
            for(let j = i + 1; j < size; j++) {
                if(array[k] > array[j]) {
                    k = j;
                }
            }
            [array[i], array[k]] = [array[k], array[i]];
        }

        return array;
    }

    _bubbleSort(array) {
        const size = array.length;

        for(let j = 1; j < size; j++) {
            for(let i = 0; i < size - j; i++) {
                if(array[i] < array[i + 1]) {
                    [array[i], array[i + 1]] = [array[i + 1], array[i]];
                }
            }
        }

        return array;
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