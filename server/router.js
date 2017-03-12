const Authentication = require('./controllers/authentication');
const postController = require('./controllers/postController');
const strategies = require('./services/passportStrategies');
const passport = require('passport');

// 使用jwt来验证，验证好后不需要cookie session
// 'jwt'告知passport使用我们在'./services/jwtStrategy'里定义好的jwtStrategy来
// 验证用户
const requireAuth = passport.authenticate('jwt', {session:false});
const requireSignin = passport.authenticate('local', {session:false});

module.exports = function(app){
    app.get('/', function(req, res, next){
       // req是request, res是response，如果返回的不是一个response，
       // 则需要用next把这个请求传递下去。
        res.send(['test_1','test_2']);
    });

   // 用于登录
    app.post('/signin', requireSignin, Authentication.signin);

    // 在访问受保护的内容前，需要先通过验证
    app.get('/secret', requireAuth, function(req, res, next){
        res.send('Some secret content.');
    });

    // 用于注册
    app.post('/signup', Authentication.signup);

    // 用于为认证用户创建新post
    app.post('/posts/new', requireAuth, postController.CreateNewPost);

    // 用于获取一个认证用户的所有posts
    app.get('/posts', requireAuth, postController.getPostsOfAnUser);

    // 删除一篇博客
    app.delete('/posts/:postId', requireAuth, postController.deletePost);

    // 获取博客的具体内容
    app.get('/posts/:postId', requireAuth, postController.getPost);
}