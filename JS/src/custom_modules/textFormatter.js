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

            if(counter >= stringLength) {
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

        const splitType = TextFormatter._getFormatType(formatType);
        if(splitType == null) {
            return null;
        } 

        const formatted = string.split(splitType);
        let result = "";

        formatted.forEach(function(element) {
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

        const splitType = TextFormatter._getFormatType(formatType);
        if(splitType == null) {
            return null;
        } 

        const formatted = string.split(splitType);
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

    }

    static _getFormatType(type) {
        switch(type) {
            // word wrap
            case "w": {
                return / /;
            }
            // symbol wrap
            case "sym": {
                return "";
            }
            // sentence wrap
            case "sen": {
                return /(?<=[.!?])/;
            }
            // none wrap
            default: {
                return null;
            }
        }
    }
}