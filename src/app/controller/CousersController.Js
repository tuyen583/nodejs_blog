const Course = require('../models/Course');
const { mongoleMongooseToObject } = require('../../util/mongoose');

class CoursesController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', {
                    course: mongoleMongooseToObject(course)
                });
            })
            .catch(next);
    }
    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }
    // [POST] /courses/store
    store(req, res, next) {
        console.log('Form data received:', req.body);
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course.save()
            .then(() => {
                console.log('Course saved successfully!');
                res.redirect('/');
            })
            .catch(error => {
                console.log('Error saving course:', error);
                console.log('Error details:', error.message);
                console.log('Error code:', error.code);
                res.status(500).send('Lỗi khi lưu khóa học: ' + error.message);
            });
    }



    // [GET] /courses
    index(req, res, next) {
        res.send('COURSES LIST PAGE' );
    }
}
module.exports = new CoursesController();