export class TextFormatter {
    
    // One single interface for formatter (I don't want to select the needed method manually)
    static format(string, stringLength, rowNumber, formatType) {

        if(!string) {
            return null;
        }

        if(!stringLength && !rowNumber && !formatType) {
            return TextFormatter._defaultFormat(string);
        }

        if(stringLength && !rowNumber && !formatType) {
            return TextFormatter._formatWithLength(string, stringLength);
        }

        if(stringLength && rowNumber && !formatType) {
            return TextFormatter._formatWithLengthAndRow(string, stringLength, rowNumber);
        }

        if(stringLength && !rowNumber && formatType) {
            return TextFormatter._formatWithLengthAndType(string, stringLength, formatType);
        }

        if(!stringLength && rowNumber && !formatType) {
            return TextFormatter._formatWithRow(string, rowNumber);
        }

        if(!stringLength && rowNumber && formatType) {
            return TextFormatter._formatWithRowAndType(string, rowNumber, formatType);
        }

        if(!stringLength && !rowNumber && formatType) {
            return TextFormatter._formatWithType(string, formatType);
        }

        stringLength = parseInt(stringLength);
        rowNumber = parseInt(rowNumber);

        if( typeof string !== "string" && typeof stringLength !== "number" && 
            typeof rowNumber !== "number" && typeof formatType !== "string" ) {
            return null;
        }

        const formatted = TextFormatter._getMatch(string, formatType);
        if(formatted == null) {
            return null;
        } 
        
        let result = "";
        let lengthCounter = 0;
        let rowsCounter = 0;

        for(let substring of formatted) {
            substring = substring.trim();

            for(let i in substring) {
                result += substring[i];
                lengthCounter++;

                if(lengthCounter == stringLength) {
                    lengthCounter = 0;
                    result += "<br\/>";
                    rowsCounter++;
                }
            }
            if(lengthCounter != 0) {
                result += `<br\/>`;
                rowsCounter++;
            }
            lengthCounter = 0;

            if(rowsCounter == rowNumber) {
                break;
            }
        }

        return result;
    }


    static _defaultFormat(string) {
        if(!string || typeof string !== "string") {
            return null;
        }
        const formatted = string.split(" ");
        let result = "";
        formatted.forEach(function(word) {
            result += `${word} <br\/>`;
        });

        return result;
    }

    static _formatWithLength(string, stringLength) {
        stringLength = parseInt(stringLength);

        if( (!string || typeof string !== "string") && 
            (!stringLength || typeof stringLength !== "number") ) {
            return null;
        }
        let result = "";
        let counter = 0;
        for(let i in string) {
            result += string[i];
            counter++;
            if(counter == stringLength) {
                counter = 0;
                result += "<br\/>";
            }
        }

        return result;
    }

    static _formatWithLengthAndRow(string, stringLength, rowNumber) {
        stringLength = parseInt(stringLength);
        rowNumber = parseInt(rowNumber);

        if( (!string || typeof string !== "string") && 
            (!stringLength || typeof stringLength !== "number") &&
            (!rowNumber || typeof rowNumber !== "number") ) {
            return null;
        }

        let result = "";
        let lengthCounter = 0;
        let rowsCounter = 0;
        for(let i in string) {
            result += string[i];
            lengthCounter++;
            if(lengthCounter >= stringLength) {
                lengthCounter = 0;
                result += "<br\/>";
                rowsCounter++;
            }
            if(rowsCounter == rowNumber) {
                break;
            }
        }

        return result;
    }

    static _formatWithRow(string, rowNumber) {
        const defaultLength = 25;

        return this._formatWithLengthAndRow(string, defaultLength, rowNumber);
    }


    static _formatWithType(string, formatType) {
        if( (!string || typeof string !== "string") && 
            (!formatType || typeof formatType !== "string") ) {
            return null;
        }
        const formatted = TextFormatter._getMatch(string, formatType);
        if(formatted == null) {
            return null;
        } 
        let result = "";
        formatted.forEach(function(element) {
            element = element.trim();
            result += `${element} <br\/>`;
        });

        return result;
    }

    static _formatWithRowAndType(string, rowNumber, formatType) {
        rowNumber = parseInt(rowNumber);
        if( (!string || typeof string !== "string") && 
            (!formatType || typeof formatType !== "string") &&
            (!rowNumber || typeof rowNumber !== "number") ) {
            return null;
        }
        const formatted = TextFormatter._getMatch(string, formatType);
        if(formatted == null) {
            return null;
        } 
        let result = "";
        let rowsCounter = 0;
        for (let element of formatted) {
            result += `${element} <br\/>`;
            rowsCounter++;
            if (rowsCounter == rowNumber) {
              break;
            }
        }

        return result;
    }

    static _formatWithLengthAndType(string, stringLength, formatType) {
        stringLength = parseInt(stringLength);
        if( (!string || typeof string !== "string") && 
            (!formatType || typeof formatType !== "string") &&
            (!stringLength || typeof stringLength !== "number") ) {
            return null;
        }
        const formatted = TextFormatter._getMatch(string, formatType);
        if(formatted == null) {
            return null;
        } 
        let result = "";
        let lengthCounter = 0;
        for(let substring of formatted) {
            substring = substring.trim();
            for(let i in substring) {
                result += substring[i];
                lengthCounter++;
                if(lengthCounter == stringLength) {
                    lengthCounter = 0;
                    result += "<br\/>";
                }
            }
            if(lengthCounter != 0) {
                result += `<br\/>`;
            }
            lengthCounter = 0;
        }

        return result;
    }

    static _getMatch(string, type) {
        let sym = type.match(/[a-z]/);
        const symCase = sym != null ? sym[0] : null;
        switch(type) {
            // word wrap
            case "w": {
                const split = string.split(/ /);
                return split;
            }
            // symbol wrap
            case symCase : {
                const reg = new RegExp(`(?=${symCase})`, 'g');
                const match = string.split(reg);
                return match;
            }
            // sentence wrap
            case "sen": {
                const match = string.match(/[^\.!\?]+[\.!\?]+/g);
                return  match;
            }
            // none wrap for this
            default: {
                return null;
            }
        }
    }
}