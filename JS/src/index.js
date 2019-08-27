import { ArrayPrecessingTool } from './custom_modules/arrayProcessingTool'
import { DateDisplayFormatter } from './custom_modules/dateDisplayFormatter'
import './style.css'

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

document.querySelector(".date-display-formatter .short-format").addEventListener("click", () => {
    const input = document.querySelector(".date-display-formatter input").value;

    const ddf = new DateDisplayFormatter(input);
    const result = ddf.toShortFormat();

    document.querySelector(".date-display-formatter .result").innerHTML = `Result: ${result}`;
});

document.querySelector(".date-display-formatter .full-format").addEventListener("click", () => {
    const input = document.querySelector(".date-display-formatter input").value;

    const ddf = new DateDisplayFormatter(input);
    const result = ddf.toFullFormate();

    document.querySelector(".date-display-formatter .result").innerHTML = `Result: ${result}`;
});

document.querySelector(".date-display-formatter .exact-format").addEventListener("click", () => {
    const input = document.querySelector(".date-display-formatter input").value;
    const template = document.querySelector(".date-display-formatter .regex").value;

    const ddf = new DateDisplayFormatter(input);
    const result = ddf.toExactFormat(template);

    document.querySelector(".date-display-formatter .result").innerHTML = `Result: ${result}`;
});

document.querySelector(".date-display-formatter .custom-format").addEventListener("click", () => {
    const input = document.querySelector(".date-display-formatter input").value;
    const template = document.querySelector(".date-display-formatter .regex").value;
    const customTemplate = document.querySelector(".date-display-formatter .regex-custom").value;

    const ddf = new DateDisplayFormatter(input);
    const result = ddf.toCustomFormat(template, customTemplate);

    document.querySelector(".date-display-formatter .result").innerHTML = `Result: ${result}`;
});