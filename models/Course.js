const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;



const courseSchema = new Schema({
        title: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        short_description: {
            type: String,
            required: true,
            trim: true
        },
        long_description: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String,
            default: 'default.jpg'
        },
        price: {
            type: Number,
            trim: true
        },
        is_active: {
            type: Boolean,
            default: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    },
    {
        timestamps: true
    });

courseSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true,
            unique: true
        })
    }
    next();
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;