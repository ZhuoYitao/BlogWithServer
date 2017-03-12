const mongoose = require('mongoose');

// 定义一个新表单
const postSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.ObjectId},
    title: {type: String},
    content: {type: String}
});

// 在mongodb里创建表单对应的模型
const postModel = mongoose.model('post', postSchema);

module.exports = postModel;