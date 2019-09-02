export class DateDisplayFormatter {

    constructor(input) {
        this._input = input;
        this.date = null;
    }

    setInput(input) {
        this._input = input;
    }

    toShortFormat() {
        const reg = /(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([12]\d{3})/
        const formatted = this._input.match(reg);
        if(!formatted) {
            return null;
        }
        this.date = {
            year: formatted[3],
            month: formatted[2],
            day: formatted[1]
        };

        return `${this.date.day}-${this.date.month}-${this.date.year}`;
    }

    toFullFormate()
    {
        const reg = /(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([12]\d{3})/
        const formatted = this._input.match(reg);
        if(!formatted) {
            return null;
        }
        this.date = {
            year: formatted[3],
            month: formatted[2],
            day: formatted[1]
        };

        return `${this.date.day}-${this._getMonth()}-${this.date.year}`;
    }

    toExactFormat(template) {
        if(!template) {
            return null;
        }
        this.date = this._getDateFromTemplate(template);

        return `${this.date.day} ${this._getMonth()} ${this.date.year}`;
    }

    toCustomFormat(template, customTemplate) {
        if(!template || !customTemplate) {
            return null;
        }
        this.date = this._getDateFromTemplate(template);
        switch(customTemplate) {
            case "MM-DD-YYYY": {
                return `${this.date.month}-${this.date.day}-${this.date.year}`;
            }
            default: {
                return "That format invalid or not supported yet.";
            }
        }
    }

    fromNow()
    {
        if(!this.date) {
            return null;
        }
        const timeFrom = new Date().getFullYear() - this.date.year;

        return timeFrom > 0 ? `${timeFrom} year` : "It's future!";
    }

    _getMonth() {
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
        return monthDictionary[this.date.month];
    }

    _getDateFromTemplate(template) {
        switch(template) {
            case "YYYYMMDD": {
                const reg = /([12]\d{3})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])/
                const formatted = this._input.match(reg);
                return {
                    year: formatted[1],
                    month: formatted[2],
                    day: formatted[3]
                };
            }
            case "YYYY-MM-DD": {
                const reg = /([12]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/;
                const formatted = this._input.match(reg);
                return {
                    year: formatted[1],
                    month: formatted[2],
                    day: formatted[3]
                };
            }
            default: {
                return null;
            }
        }
    }
}