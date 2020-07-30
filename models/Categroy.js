const mongoose = require('mongoose')
const CategorySchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        }
    },
    {timestamps: true}
)
const Category = mongoose.model('Category',CategorySchema)
module.exports = Category