// passport strategy用于处理那些需要验证信息的request

const passport = require('passport');
const userModel = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// 创建JWT strategy
// 需要告诉strategy到哪去找到jwt
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};
// payload是controller里jwt的encode函数的第一个参数，是token代表的那些数据
// 比如user ID和时间戳
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    // See if the user ID in the payload exists in our database
    // If it does, call 'done' with that user
    // otherwise, call done without a user object
    userModel.findById(payload.sub, function(err, user){
        if(err){
            return done(err, false);
        }
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    });
});

// 告诉strategy用户名在'email'域里
// 更具体讲，在request.body的'email'域里
const localOptions = {usernameField: 'email'};
// done的第一个参数是关于错误的信息
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
    // 验证用户名和密码
    userModel.findOne({email:email.toLowerCase()}, function(err, user){
        if(err){
               return done(err);
        }
        if(!user){
               return done("账号不存在",false);
        }
        // user.comparePassword(password, function(err, isMatch){
        //     if(err){
        //         console.log(err);
        //         return done(err);
        //     }
        //     if(!isMatch){
        //         console.log('Unmatched');
        //         return done(null, false);
        //     }
        //     console.log(user);
        //     return done(null,user);
        // });
        if(user.password===password){
            return done(null, user);
        }else{
            return done("账号与密码不匹配");
        }
    });
});

// Tell passport to use this strategy
// 使用这个strategy后，passport会用这个strategy验证传入的request，验证成功
// 后才把它传递给controller处理
passport.use(jwtLogin);
passport.use(localLogin);