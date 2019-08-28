export class ArraySorter {

    constructor(input) {
        this._array = input;
    }

    sort(order) {
        if(!order || typeof order !== "string" || order != "desc" || order != "asc") {
            return null;
        }

        switch(Math.random() * 5) {
            case 1: {
                return this._quickSort(order);
            }
            case 2: {
                return this._shellSort(order);
            }
            case 3: {
                return this._simpleInclusionSort(order);
            }
            case 4: {
                return this._simpleSelectionSort(order);
            }
            case 5: {
                return this._bubbleSort(order);
            }
        }
    }

    _quickSort(order) {

    }

    _shellSort(order) {

    }

    _simpleInclusionSort(order) {

    }

    _simpleSelectionSort(order) {

    }

    _bubbleSort(order) {

    }
}