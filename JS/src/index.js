import { ArrayPrecessingTool } from './custom_modules/arrayProcessingTool'
import { DateDisplayFormatter } from './custom_modules/dateDisplayFormatter'
import { TextFormatter } from './custom_modules/textFormatter'
import { StringCalculator } from './custom_modules/stringCalculator'
import { ArraySorter } from './custom_modules/arraySorter'
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


const ddf = new DateDisplayFormatter();

document.querySelector(".date-display-formatter .short-format").addEventListener("click", () => {
    const input = document.querySelector(".date-display-formatter input").value;

    ddf.setInput(input);
    const result = ddf.toShortFormat();

    document.querySelector(".date-display-formatter .result").innerHTML = `Result: ${result}`;

});

document.querySelector(".date-display-formatter .full-format").addEventListener("click", () => {
    const input = document.querySelector(".date-display-formatter input").value;

    ddf.setInput(input);
    const result = ddf.toFullFormate();

    document.querySelector(".date-display-formatter .result").innerHTML = `Result: ${result}`;
});

document.querySelector(".date-display-formatter .exact-format").addEventListener("click", () => {
    const input = document.querySelector(".date-display-formatter input").value;
    const template = document.querySelector(".date-display-formatter .regex").value;

    ddf.setInput(input);
    const result = ddf.toExactFormat(template);

    document.querySelector(".date-display-formatter .result").innerHTML = `Result: ${result}`;
});

document.querySelector(".date-display-formatter .custom-format").addEventListener("click", () => {
    const input = document.querySelector(".date-display-formatter input").value;
    const template = document.querySelector(".date-display-formatter .regex").value;
    const customTemplate = document.querySelector(".date-display-formatter .regex-custom").value;

    ddf.setInput(input);
    const result = ddf.toCustomFormat(template, customTemplate);

    document.querySelector(".date-display-formatter .result").innerHTML = `Result: ${result}`;
});

document.querySelector(".date-display-formatter .from-now").addEventListener("click", () => {

    const result = ddf.fromNow();

    document.querySelector(".date-display-formatter .result").innerHTML = `Result: ${result}`;
});

document.querySelector(".text-formatter button").addEventListener("click", () => {
    const text = document.querySelector(".text-formatter .text").value;
    const length = document.querySelector(".text-formatter .length").value;
    const rows = document.querySelector(".text-formatter .rows").value;
    const type = document.querySelector(".text-formatter .format-type").value;

    const result = TextFormatter.format(text, length, rows, type);

    document.querySelector(".text-formatter .result").innerHTML = `Result: ${result}`;
})

document.querySelector(".string-calculator button").addEventListener("click", () => {
    const input = document.querySelector(".string-calculator input").value;
    const result = StringCalculator.doEvil(input);

    document.querySelector(".string-calculator .result").innerHTML = `Result: ${result}`;
});