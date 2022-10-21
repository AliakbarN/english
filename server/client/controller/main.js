const helper = require('../../helper');

class MainClientController {
    static getHomePage (req, res) {
        helper.sendPage(res, 'index');
    };

    static notFound (req, res) {
        res.status(404);
        return res.render(helper.getView('404'));
    };

    static getWordsPage (req, res) {
        helper.sendPage(res, 'words');
    };

    static getLernPage (req, res) {
        helper.sendPage(res, 'lern');
    }
}

module.exports = MainClientController;