const axios = require('axios');

class Speller {
    static getUrl (text) {
        let arr = text.split(' ');
        let url = process.env['API_URL_SPELLER'];

        for (let i = 0; i < arr.length; i++) {
            let word = arr[i];

            url += word;

            if (arr[i + 1] != undefined) url += '+';
        }

        return url;
    };

    static async checkText (text) {
        const url = this.getUrl(text);

        const res = await axios.get(url);
        return res.data;
    };
};

module.exports = Speller;