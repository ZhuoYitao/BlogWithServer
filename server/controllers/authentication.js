const jwt = require('jwt-simple');
const userModel = require('../models/user');
const config = require('../config');

// 使用自定义的安全码，为一个user生成一个jwt (json web token)
function tokenForUser(user){
    const timestamp = new Date().getTime();
    // iat: issue at time
    return jwt.encode({ sub: user.id, iat:timestamp }, config.secret);
}

// Controller 用于处理http请求
exports.signup = function(req, res, next){
    // See if a user with the given email exists
    // req.body记录了request携带的内容
    console.log(req.headers);
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(422).send({error:'You must provide both email and password.'});
    }

    // 搜索完成后会执行回调函数
    userModel.findOne({ email: email }, function(err, existingUser){
        /* 如果本controller没有对request作出相应，则需要用next把request交给
           后续组件处理
         */
        if(err){
            return next(err);
        }
        // If a user with email does exist, return an error
        if(existingUser){
            // 422代表传入的数据有问题
            res.status(422).send({ error: 'Email is in use' });
        }
        // If a user with email does not exist, create and send user record
        // 创建一个user模型实例
        // 注意，创建一个model实例的同时，会赋予其一个id
        const user = new userModel({
            email: email,
            password: password
        });
        // 把user保存到数据库
        // save动作执行完后会执行回调函数
        user.save(function(err){
            if(err){
                return next(err);
            }
            // Respond to request indicating the user was created
            res.json({token: tokenForUser(user)});
        });
    });
}

exports.signin = function(req, res, next){
    // 调用这个函数时，用户信息已经通过password的local strategy验证过了
    // 此时我们只需要传一个jwt给用户
    res.send({
        token: tokenForUser(req.user),
    });
}