const helper = require('../../helper');
const Word = require('../db/models/word');

class WordService {
    static async save (word) {
        try {
            const wordData = new Word({ word, translations: helper.jsonString([]) });
            const res = await wordData.save();
            return res;
        } catch (e) {
            console.log(e);
            return null;
        }
    };

    static async delete (word) {
        try {
            const wordData = await Word.findOneAndDelete({ word });
            if (!wordData) return null;
            return wordData;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async find (word) {
        try {
            const wordData = await Word.findOne({ word });
            if (!wordData) return false;
            return wordData;
        } catch (e) {
            console.log(e);
            return null;
        }
    };

    static async getAllWords () {
        try {
            const wordData = await Word.find();
            return wordData;
        } catch (e) {
            console.log(e);
            return null;
        }
    };

    static async saveTranslationWord (word, target) {
        try {
            const wordData = await Word.findOne({ word: target });
            console.log(wordData);
            if (helper.isIncludesWord(wordData.translations, word)) return null;
            
            let currentTrns = helper.jsonParser(wordData.translations);
            currentTrns.push(word);

            const data = await Word.findOneAndUpdate({ word: target }, { translations: helper.jsonString(currentTrns) });
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    };

    static async updateTranslationWord (word, target) {
        try {
            word = helper.formatText(word);
            const wordData = await Word.findOneAndUpdate({ word: target }, { translations: helper.jsonString(word) })
            return wordData
        } catch (e) {
            console.log(e);
            return null;
        }
    }
};

module.exports = WordService;