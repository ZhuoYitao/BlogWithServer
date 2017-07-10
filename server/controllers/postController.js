const postModel = require('../models/post');
const userModel = require('../models/user');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
exports.CreateNewPost = function(req, res, next){
    console.log('正在记录新博客');
    console.log(req);
    // request经过passport jwtStrategy时被添加了user属性
    const uid = req.user.id;
    // const uid = '585222253915f904c4df18dd';
    // const title = req.body.title;
    // const content = req.body.content;
    const title = req.body.title;
    const content  =req.body.content;

    // 创建一个post实例
    // 创建时就被赋予了一个id属性
    const post = new postModel({
        userId: uid,
        title: title,
        content: content
    });

    let userFound;

    console.log('正在保存新博客');
    // 把post保存到user的作品集里
    userModel.findById(uid, function(err, user){
        if(err){
           return next(err);
        }
        userFound = user;
        user.postIds.push(post.id);
        user.save(function(err){
            if(err){
                return next(err);
            }
        })
    });

    // 把这个post实例保存到数据库
    post.save(function(err){
        if (err){
            // 如果保存post实例时出错了，需要把user里的对应记录删掉
            userFound.postIds.remove(post.id);
            userFound.save(function(err){
                if(err){
                    return next(err);
                }
            });
            return next(err);
        }
    });

    // 如果保存时没遇到问题，就返回一个response
    res.send({postId: post.id});
};

// Update a post
exports.updatePost = function(req, res, next){
    const postId = req.body.postId;
    const title = req.body.title;
    const content = req.body.content;

    postModel.findById(postId, function (err, post) {
        // Handle any possible database errors
        if (err) {
            res.status(500).send(err);
        } else {
            // Update each attribute of a post
            // If that attribute isn't in the request body, default back to whatever it was before.
            post.title = title || post.title;
            post.content = content || post.description;

            // Save the updated post back to the database
            post.save(function (err, post) {
                if (err) {
                    res.status(500).send(err)
                }
                res.send(post);
            });
        }
    });
};

exports.getPostsOfAnUser = function(req, res, next){
    const uid = req.user.id;
    var posts = [];

    // .exec()返回一个Promise
    // 如果一个对象定义了then方法，我们就可以称之为一个Promise
    var userPromise = userModel.findById(uid).exec();
    // 一个Promise里的回调函数执行完毕后其then方法可以被执行
    // then会调用一个回调函数，并返回一个新的Promise
    // 在这儿，我们在用户被找到后根据其postIds属性，查找其发表过的post
    // 并把这些post保存起来。
    userPromise.then(user=>{
        let i = 0;
        for(let postId of user.postIds){
            postModel.findById(postId).exec().then(post=>{
                posts.push({"id": postId, "title": post.title});
            }).then(()=>{
                // 当一个post被找到时，我们就更新已经记录的post数
                // 如果已经记录了所有post，就让response发送这些posts
                i += 1;
                if(i==user.postIds.length){
                    res.send({"posts":posts});
                }
            });
        }
    });

    // userPromise.then里调用了回调函数
    // 在回调函数执行之前，下面的语句会先被执行
    // 因此如果在这返回响应的话，会得到一个空数组
    // res.send(posts);
};

exports.deletePost = function(req, res, next){
    console.log(req.headers);
    console.log(req.user);

    const postId = req.params.postId;
    let userId = '';
    let post = {};

    // // 找到post对应的user
    postModel.findById(postId).then((post)=>{
        if(!post){
            return next('没有找到对应博客');
        }
       // 记录post对应的用户
        userId = post.userId;
    }).then(()=>{
        userModel.findById(userId).then((user)=>{
            if(!user){
                return next('没有找到博客对应的用户');
            }
            // 找到用户后在用户postId属性里删除该postId
            let index = 0;
            for (let pId of user.postIds){
                // 要注意mongodb存的数据转换给js的数据时
                // 数据类型可能跟预料的不一样
                if (pId.toString() === postId){
                    console.log(pId);
                    // 用index处开始删掉一个元素
                    // 相当于删掉index对应的元素
                    user.postIds.splice(index, 1);
                    break;
                }
                index += 1;
            }
            console.log(user.postIds.length);
            // 手动修改数据模型实例时，记得手动保存
            user.save();
        });
    }).then(()=>{
        // 从post模型里删除postId对应的post
        postModel.findById(postId).remove().exec();
        // 记得对请求作出响应
        res.send({'message': '删除成功'});
    }).catch(()=>{
        return next('删除出错');
    });
};

exports.getPost = function(req, res, next){
    const postId = req.params.postId;
    console.log(postId);

    postModel.findById(postId).then((post)=>{
        if(!post){
            return next('没有找到对应博客');
        }
        res.send({'title': post.title, 'content': post.content});
    }).catch(()=>{
        return next('出错了');
    });
};