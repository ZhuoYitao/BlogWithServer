// model用于定义存到数据库里的数据

const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    password: {type: String},
    postIds: [{type: Schema.ObjectId}]
});

// // On save hook, encrypt password
// // 在把model存到数据库之前，执行回调函数
// userSchema.pre('save', function(next){
//     // 此时的this是一个user model实例
//     const user = this;
//     // salt的产生过程会花费一些时间
//     // 在salt产生之后，我们调用回调函数
//     bcrypt.genSalt(10, function(err, salt){
//         if(err){return next(err);}
//         // 回调函数根据密码和生成的salt产生加密过的密码
//         console.log(user.password);
//         bcrypt.hash(user.password, salt, null, function(err, hash){
//             if(err){return next(err);}
//             // 加密完成后，用hash覆盖model里的password
//             // 注意，hash由salt并上加密后的密码组成
//             // 也就是说，我们可以从hash中分别知道salt和加密后的密码
//             user.password = hash;
//             // 执行后续操作
//             next();
//         });
//     });
// });

// // 为UserSchema对应的model添加自定义的方法
// userSchema.methods.comparePassword = function(candidatePassword, callback){
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
//         if(err){return callback(err);}
//         callback(null, isMatch);
//     });
// }

// Create the model class
// 创建user的集合
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;