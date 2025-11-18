const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteControllers {
    // [GET] render news
    index(req, res, next) {
        Course.find({})

            .then(courses => {
                   res.render('home', {
                courses: mutipleMongooseToObject(courses)
                   })
            })
            .catch(next);
    }
    // [GET] render news detail
    search(req, res) {
        res.render('search');
    }
}



module.exports = new SiteControllers;
    