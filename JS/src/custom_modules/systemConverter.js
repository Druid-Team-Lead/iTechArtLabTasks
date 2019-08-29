export class SystemConverter {

    static convert(number, from, to) {
        number = parseInt(number, from);

        return number.toString(to);
    }
}