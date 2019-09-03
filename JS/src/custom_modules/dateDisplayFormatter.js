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
            return "Invalid date. This formate for a date like 31102011 (DDMMYYYY). Use exact or custom.";
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
            return "Invalid date. This formate for a date like 31102011 (DDMMYYYY). Use exact or custom.";
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
            return "Regex/template not specified";
        }
        const display = this._getDateFromTemplate(template);
        if(!display) {
            return "Invalid date or regex(template)."
        }

        return display;
    }

    toCustomFormat(template, customTemplate) {
        if(!template || !customTemplate) {
            return "Regex/template not specified";
        }
        const display = this._getDateFromTemplate(template);
        if(!display) {
            return "Invalid date or regex(template)."
        }

        switch(customTemplate) {
            case "YYYYMMDD": {
                return `${this.date.year} ${this._getMonth()} ${this.date.day}`;
            }
            case "YYYY-MM-DD": {
                return `${this.date.year}-${this.date.month}-${this.date.day}`;
            }
            case "YYYYDDMM": {
                return `${this.date.year} ${this.date.day} ${this._getMonth()}`;
            }
            case "YYYY-DD-MM": {
                return `${this.date.year}-${this.date.day}-${this.date.month}`;
            }
            case "MMDDYYYY": {
                return `${this._getMonth()} ${this.date.day} ${this.date.year}`;
            }
            case "MM-DD-YYYY": {
                return `${this.date.month}-${this.date.day}-${this.date.year}`;
            }
            case "DDMMYYYY": {
                return `${this.date.day} ${this._getMonth()} ${this.date.year}`;
            }
            case "DD-MM-YYYY": {
                return `${this.date.day}-${this.date.month}-${this.date.year}`;
            }

            case "YYMMDD": {
                return `${this.date.year.substring(this.date.year.length-2)} ${this._getMonth()} ${this.date.day}`;
            }
            case "YY-MM-DD": {
                return `${this.date.year.substring(this.date.year.length-2)}-${this.date.month}-${this.date.day}`;
            }
            case "YYDDMM": {
                return `${this.date.year.substring(this.date.year.length-2)} ${this.date.day} ${this._getMonth()}`;
            }
            case "YY-DD-MM": {
                return `${this.date.year.substring(this.date.year.length-2)}-${this.date.day}-${this.date.month}`;
            }
            case "MMDDYY": {
                return `${this._getMonth()} ${this.date.day} ${this.date.year.substring(this.date.year.length-2)}`;
            }
            case "MM-DD-YY": {
                return `${this.date.month}-${this.date.day}-${this.date.year.substring(this.date.year.length-2)}`;
            }
            case "DDMMYY": {
                return `${this.date.day} ${this._getMonth()} ${this.date.year.substring(this.date.year.length-2)}`;
            }
            case "DD-MM-YY": {
                return `${this.date.day}-${this.date.month}-${this.date.year.substring(this.date.year.length-2)}`;
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
                if(!formatted) return null;
                this.date = {
                    year: formatted[1],
                    month: formatted[2],
                    day: formatted[3]
                }
                this.date.display = `${this.date.day} ${this._getMonth()} ${this.date.year}`
                return this.date.display;
            }
            case "YYYY-MM-DD": {
                const reg = /([12]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/;
                const formatted = this._input.match(reg);
                if(!formatted) return null;
                this.date = {
                    year: formatted[1],
                    month: formatted[2],
                    day: formatted[3]
                }
                this.date.display = `${this.date.day}-${this.date.month}-${this.date.year}`
                return this.date.display;
            }
            case "YYYYDDMM": {
                const reg = /([12]\d{3})(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])/;
                const formatted = this._input.match(reg);
                if(!formatted) return null;
                this.date = {
                    year: formatted[1],
                    month: formatted[2],
                    day: formatted[3]
                }
                this.date.display = `${this.date.day} ${this._getMonth()}-${this.date.year}`
                return this.date.display;
            }
            case "YYYY-DD-MM": {
                const reg = /([12]\d{3})-(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])/;
                const formatted = this._input.match(reg);
                if(!formatted) return null;
                this.date = {
                    year: formatted[1],
                    month: formatted[2],
                    day: formatted[3]
                }
                this.date.display = `${this.date.day}-${this.date.month}-${this.date.year}`
                return this.date.display;
            }
            case "MMDDYYYY": {
                const reg = /(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([12]\d{3})/;
                const formatted = this._input.match(reg);
                if(!formatted) return null;
                this.date = {
                    year: formatted[3],
                    month: formatted[1],
                    day: formatted[2]
                };
                this.date.display = `${this.date.day} ${this._getMonth()} ${this.date.year}`
                return this.date.display;
            }
            case "MM-DD-YYYY": {
                const reg = /(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([12]\d{3})/;
                const formatted = this._input.match(reg);
                if(!formatted) return null;
                this.date = {
                    year: formatted[3],
                    month: formatted[1],
                    day: formatted[2]
                };
                this.date.display = `${this.date.day}-${this.date.month}-${this.date.year}`
                return this.date.display;
            }
            case "DD-MM-YYYY": {
                const reg = /(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([12]\d{3})/;
                const formatted = this._input.match(reg);
                if(!formatted) return null;
                this.date = {
                    year: formatted[3],
                    month: formatted[2],
                    day: formatted[1]
                };
                this.date.display = `${this.date.day}-${this._getMonth()}-${this.date.year}`
                return this.date.display;
            }
            case "DDMMYYYY": {
                const reg = /(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([12]\d{3})/;
                const formatted = this._input.match(reg);
                if(!formatted) return null;
                this.date = {
                    year: formatted[3],
                    month: formatted[2],
                    day: formatted[1]
                };
                this.date.display = `${this.date.day}-${this.date.month}-${this.date.year}`
                return this.date.display;
            }
            // ------------ YY 
            case "YYMMDD": {
                const reg = /(0[1-9]|[1-9][0-9])(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])/
                const formatted = this._input.match(reg);
                if(!formatted) return null;
                this.date = {
                    year: formatted[1],
                    month: formatted[2],
                    day: formatted[3]
                }
                this.date.display = `${this.date.day} ${this._getMonth()} ${this.date.year}`
                return this.date.display;
            }
            case "YY-MM-DD": {
                const reg = /(0[1-9]|[1-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/;
                const formatted = this._input.match(reg);
                if(!formatted) return null;
                this.date = {
                    year: formatted[1],
                    month: formatted[2],
                    day: formatted[3]
                }
                this.date.display = `${this.date.day}-${this.date.month}-${this.date.year}`
                return this.date.display;
            }
            case "YYDDMM": {
                const reg = /(0[1-9]|[1-9][0-9])(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])/;
                const formatted = this._input.match(reg);
                if(!formatted) return null;
                this.date = {
                    year: formatted[1],
                    month: formatted[2],
                    day: formatted[3]
                }
                this.date.display = `${this.date.day} ${this._getMonth()}-${this.date.year}`
                return this.date.display;
            }
            case "YY-DD-MM": {
                const reg = /(0[1-9]|[1-9][0-9])-(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])/;
                const formatted = this._input.match(reg);
                if(!formatted) return null;
                this.date = {
                    year: formatted[1],
                    month: formatted[2],
                    day: formatted[3]
                }
                this.date.display = `${this.date.day}-${this.date.month}-${this.date.year}`
                return this.date.display;
            }
            case "MMDDYY": {
                const reg = /(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-9][0-9])/;
                const formatted = this._input.match(reg);
                if(!formatted) return null;
                this.date = {
                    year: formatted[3],
                    month: formatted[1],
                    day: formatted[2]
                };
                this.date.display = `${this.date.day} ${this._getMonth()} ${this.date.year}`
                return this.date.display;
            }
            case "MM-DD-YY": {
                const reg = /(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-9][0-9])/;
                const formatted = this._input.match(reg);
                if(!formatted) return null;
                this.date = {
                    year: formatted[3],
                    month: formatted[1],
                    day: formatted[2]
                };
                this.date.display = `${this.date.day}-${this.date.month}-${this.date.year}`
                return this.date.display;
            }
            case "DD-MM-YY": {
                const reg = /(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])(0[1-9]|[1-9][0-9])/;
                const formatted = this._input.match(reg);
                if(!formatted) return null;
                this.date = {
                    year: formatted[3],
                    month: formatted[2],
                    day: formatted[1]
                };
                this.date.display = `${this.date.day}-${this._getMonth()}-${this.date.year}`
                return this.date.display;
            }
            case "DDMMYY": {
                const reg = /(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])(0[1-9]|[1-9][0-9])/;
                const formatted = this._input.match(reg);
                if(!formatted) return null;
                this.date = {
                    year: formatted[3],
                    month: formatted[2],
                    day: formatted[1]
                };
                this.date.display = `${this.date.day}-${this.date.month}-${this.date.year}`
                return this.date.display;
            }
            default: {
                return null;
            }
        }
    }
}