const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const Course = new Schema({
    name: { type: String,maxLength: 255 ,required: true },
    description: { type: String,maxLength: 600 },
    image: { type: String,maxLength: 255 },
    videoId: { type: String,maxLength: 255 ,required: true },
    level: { type: String,maxLength: 255 },
    slug: { type: String, slug: 'name', unique: true  },
}, { timestamps: true });

Course.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: true 
});

module.exports = mongoose.model('Course', Course);