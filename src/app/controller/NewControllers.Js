
class NewControllers {
    // [GET] render news
    index(req, res) {
        res.render('news');
    }
    // [GET] render news detail
    show(req, res) {
        res.render('newsDetail');
    }
}



module.exports = new NewControllers;
