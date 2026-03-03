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
    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => {
                res.render('courses/edit', {
                    course: mongoleMongooseToObject(course)
                });
            })
            .catch(next);
    } 

    // [PUT] /courses/:id
    update(req, res, next) {    
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    // [DELETE] /courses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/courses'))
            .catch(next);
    }
    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/courses'))
            .catch(next);
    }
    
    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        const action = req.body.action;
        const coursesIds = req.body.coursesIds || req.body['coursesIds[]'];
        
        console.log('=== handleFormActions ===');
        console.log('Full body:', JSON.stringify(req.body));
        console.log('Action:', action); 
        console.log('CoursesIds:', coursesIds);
        
        switch (action) {
            case 'delete':
                if (!coursesIds || (Array.isArray(coursesIds) && coursesIds.length === 0)) {
                    console.log('No courses selected - returning error');
                    return res.status(400).send('No courses selected');
                }
                console.log('Deleting with IDs:', coursesIds);
                Course.delete({ _id: { $in: coursesIds } })
                    .then(() => {
                        console.log('Delete successful');
                        res.redirect('/me/stored/courses');
                    })
                    .catch(error => {
                        console.log('Delete error:', error);
                        next(error);
                    });
                break;
            default:
                res.status(400).send('Action is invalid');
        }
    }
    
    // [GET] /courses
    index(req, res, next) {
        res.send('COURSES LIST PAGE' );
    }
}
module.exports = new CoursesController();