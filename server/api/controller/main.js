const helper = require('../../helper');
const WordService = require('../services/word');

class mainApiController {
    static async save (req, res) {
        try {
            const { text } = req.body;

            const checkData = await WordService.find(text);

            if (checkData) return res.sendStatus(209);

            const word = await WordService.save(text);
            return res.status(200).json(word);
        } catch (e) {
            console.log(e);
        }
    };

    static async delete (req, res) {
        try {
            const { word } = req.body;

            const wordData = await WordService.delete(word);
            
            if (!wordData) return res.sendStatus(400);

            res.status(200).json(wordData);
        } catch (e) {
            console.log(e);
        }
    }

    static async getWords (req, res) {
        try {
            const wordData = await WordService.getAllWords();

            if (!wordData) return res.sendStatus(505);

            if (req.query['just-words'] == 'true') return res.status(200).json(helper.dataToArr(wordData));

            res.status(200).json(helper.convertRes(wordData));
        } catch (e) {
            console.log(e);
        }
    };

    static async saveTranslation (req, res) {
        try {
            const { text, target } = req.body;

            const data = await WordService.saveTranslationWord(text, target);
    
            if (!data) return res.sendStatus(400);
    
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    };

    static async updateTranslation (req, res) {
        try {
            const { text, target } = req.body;

            const wordData = await WordService.updateTranslationWord(text, target);
    
            if (!wordData) return res.sendStatus(400);
    
            res.status(200).json(wordData);
        } catch(e) {
            console.log(e);
        }
    }
};

module.exports = mainApiController;