const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
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
        is_active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;