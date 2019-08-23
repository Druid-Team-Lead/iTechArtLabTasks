import { ArrayPrecessingTool } from './custom_modules/arrayProcessingTool'
import './style.css'

document.getElementsByClassName("btn-subsum-on2")[0].addEventListener("click", () => {
    const input = document.getElementsByClassName("input-subsum-on2")[0].value;
    const result = new ArrayPrecessingTool().getMaxSubSum_On2(input);
    document.getElementsByClassName("subsum-on2-result")[0].innerHTML = `Подмассив: ([${result.subarray.length == 0 ? "отсутствует" : result.subarray}]); Сумма подмассива = ${result.subarraySum}`;
});

document.getElementsByClassName("btn-subsum-on")[0].addEventListener("click", () => {
    const input = document.getElementsByClassName("input-subsum-on")[0].value;
    const result = new ArrayPrecessingTool().getMaxSubSum_On(input);
    document.getElementsByClassName("subsum-on-result")[0].innerHTML = `Подмассив: ([${result.subarray.length == 0 ? "отсутствует" : result.subarray}]); Сумма подмассива = ${result.subarraySum}`;
});