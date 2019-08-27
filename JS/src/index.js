import { ArrayPrecessingTool } from './custom_modules/arrayProcessingTool'
import './style.css'
require ('../src/img/bg.gif')
require ('../src/img/logo.png')

document.querySelector(".array-precessing-tool button").addEventListener("click", () => {
    const input = document.querySelector(".array-precessing-tool input").value;
    const apt = new ArrayPrecessingTool(input);

    const maxSubSumOn2 = apt.getMaxSubSum_On2(input);
    const maxSubSumOn = apt.getMaxSubSum_On(input);
    const max = apt.searchMax(input);
    const min = apt.searchMin(input);
    const medium = apt.searchMedian(input);
    const maximumSequence = apt.getMaximumSequence(input);


    document.querySelector(".array-precessing-tool .result").innerHTML = `
    Сумма подмассива O(n)^2 = ${maxSubSumOn2};
    Сумма подмассива O(n) = ${maxSubSumOn};
    Максимальное значение = ${max};
    Минимальное значение ${min};
    Медианное значение ${medium};
    Макс последовательность = ${maximumSequence}.
    `;
});

document.querySelector(".date-display-formatter button").addEventListener("click", () => {
    const input = document.querySelector(".date-display-formatter input").value;
});