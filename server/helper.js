const path = require('path');

class Helper {
    static getView (file) {
        return path.normalize(`${__dirname}/../views/pages/${file}.ejs`);
    };

    static sendPage (res, file) {
        res.status(200);
        return res.render(this.getView(file));
    };

    static sortSiutableWords (arr, n) {
        let res = [];
        const firstArr = arr[0]['s'];

        if (arr.length === 1) return firstArr;

        firstArr.forEach( fWord => {
            for (let i = 1; i < arr.length; i++) {
                for (let j = 0; j < arr[i]['s'].length; i++) {
                    if (i === n) break;
                    res.push(`${fWord} ${arr[i]['s'][j]}`);   
                }
            }
        });

        return res;
    };

    static isIncludesWord (arrJson, word) {
        const arr = this.jsonParser(arrJson);
        if (arr.includes(word)) return true;
        else return false;
    };

    static jsonParser (text) {
        return JSON.parse(text);
    };

    static jsonString (item) {
        return JSON.stringify(item);
    };

    static sortWordData (data) {
        const newData =  data.sort( (a, b) => {
            if (a.word.toLowerCase() > b.word.toLowerCase()) return 1;
            else if (a.word.toLowerCase() < b.word.toLowerCase()) return -1;
            return 0;
        });
        return newData
    }

    static convertRes (data) {
        let result = [];
        data = this.sortWordData(data);
        data.forEach( dt => {
            let word = dt.word;
            let translations = this.jsonParser(dt.translations);

            if (translations.length === 0) {
                result.push(word);
            } else {
                word += ' : ';
                translations.forEach( (tr, index) => {
                    word += tr;

                    if (translations[index + 1] != undefined) word += ', ';
                });
                result.push(word);
            }
        });
        return result;
    };

    static dataToArr (data) {
        let res = [];

        data.forEach( dt => {
            res.push(dt.word);
        });

        return res;
    }

    static formatText (text) {
        return text.split(',').map( wrd => wrd.trim());
    }
};

module.exports = Helper;