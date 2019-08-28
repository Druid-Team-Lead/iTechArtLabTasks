export class StringCalculator {

    // If enough just +,-,*,/ then I think eval can do that work.
    static doEvil(string) {
        const clearInput = StringCalculator._inputConverter(string);
        const result = eval(clearInput);

        return result
    }

    static _inputConverter(input) {
        const result = input.replace(/[^0-9\/\(\).*+-]/, "");

        return result;
    }
}