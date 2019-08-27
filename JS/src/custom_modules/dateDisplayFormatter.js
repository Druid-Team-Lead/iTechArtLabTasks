export class DateDisplayFormatter {

    constructor(input) {
        this._input = this._inputHandler(input);
    }

    toShortFormat() {
        let reg = /(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([12]\d{3})/
        let formatted = this._input.match(reg);
        return `${formatted[1]}-${formatted[2]}-${formatted[3]}`;
    }

    toFullFormate()
    {
        let reg = /(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([12]\d{3})/
        let formatted = this._input.match(reg);
        return `${formatted[1]}-${this._getMonth(formatted[2])}-${formatted[3]}`;
    }

    toExactFormat(template) {
        if(!template) {
            return null;
        }

        const formatted = this._getFormatFromTemplate(template);
        
        return `${formatted.day}-${this._getMonth(formatted.month)}-${formatted.year}`;
    }

    toCustomFormat(template, customTemplate) {
        if(!template || !customTemplate) {
            return null;
        }

        const formatted = this._getFormatFromTemplate(template);

        switch(customTemplate) {
            case "MM-DD-YYYY": {
                return `${formatted.month}-${formatted.day}-${formatted.year}`;
            }
            default: {
                return null;
            }
        }
    }


    fromNow()
    {
        // how old _input date was ? 
    }

    _inputHandler(input) {
        // clean up input string with regex => return 
        return input;
    }

    _getMonth(number) {
        const monthDictionary = {
            "01": "January",
            "02": "February",
            "03": "March",
            "04": "April",
            "05": "May",
            "06": "June",
            "07": "July",
            "08": "August",
            "09": "September",
            "10": "October",
            "11": "November",
            "12": "December"
        };
        return monthDictionary[number];
    }

    _getFormatFromTemplate(template) {

        switch(template) {
            case "YYYYMMDD": {
                let reg = /([12]\d{3})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])/
                let formatted = this._input.match(reg);
                return {
                    year: formatted[1],
                    month: formatted[2],
                    day: formatted[3]
                };
            }
            case "YYYY-MM-DD": {
                let reg = /([12]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/;
                let formatted = this._input.match(reg);
                return {
                    year: formatted[1],
                    month: formatted[2],
                    day: formatted[3]
                };
            }
            default: {
                return {
                    year: null,
                    month: null,
                    day: null
                };
            }
        }
    }
}