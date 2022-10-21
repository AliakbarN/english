const helper = require('../../helper');
const speller = require('../services/speller');

module.exports = async function (req, res, next) {
    const { text } = req.body;

    const response = await speller.checkText(text);

    if (response == undefined || response.length == 0) return next();
    let r = helper.sortSiutableWords(response);

    res.status(203).json(r);
}