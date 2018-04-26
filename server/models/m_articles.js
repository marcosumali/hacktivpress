var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = mongoose.Schema({
    title: String,
    content: String,
    category: String,
    Author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;