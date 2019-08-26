import { ArrayPrecessingTool } from './custom_modules/arrayProcessingTool'
import './style.css'
require ('../src/img/bg.gif')
require ('../src/img/logo.png')

document.querySelector(".btn-array-precessing-tool").addEventListener("click", () => {
    const input = document.querySelector(".input-array-precessing-tool").value;
    const apt = new ArrayPrecessingTool(input);

    const maxSubSumOn2 = apt.getMaxSubSum_On2(input);
    const maxSubSumOn = apt.getMaxSubSum_On(input);
    const max = apt.searchMax(input);
    const min = apt.searchMin(input);
    const medium = apt.searchMedian(input);
    const maximumSequence = apt.getMaximumSequence(input);


    document.querySelector(".result-array-precessing-tool").innerHTML = `
    Сумма подмассива O(n)^2 = ${maxSubSumOn2};
    Сумма подмассива O(n) = ${maxSubSumOn};
    Максимальное значение = ${max};
    Минимальное значение ${min};
    Медианное значение ${medium};
    Макс последовательность = ${maximumSequence}.
    `;
});