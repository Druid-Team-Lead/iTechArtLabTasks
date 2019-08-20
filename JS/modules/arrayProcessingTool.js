class ArrayExtension {

    getMaxSubSum_On2(input) {
        console.log("Sub Sum O(n^2)");

        var array = input.split(" ");
        console.log(`Array: ${array}`);  
        let sum = 0;
        let max = 0;
        
        for (let i = 0; i < array.length; i++) {   

            for(let j = i; j < array.length; j++) {

                sum += parseInt(array[j]);

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
    }
}

document.getElementsByClassName("btn-sub-sum")[0].addEventListener("click", () => {
    const input = document.getElementsByClassName("sub-sum")[0].value;
    const sum = new ArrayExtension().getMaxSubSum_On2(input);
    const result = document.getElementsByClassName("sub-sum-result")[0].innerHTML = sum.toString();
});