const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const helmet = require('helmet')
const path = require('path')

// 添加csp
// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     frameAncestors: ["'none'"], // 定义了哪些源可以嵌入当前页面
//     sandbox: [], // 不允许脚本
//   },
// }))

// sandbox
// 'allow-forms'：允许表单。
// 'allow-modals'：允许模态对话框。
// 'allow-orientation-lock'：允许锁定屏幕方向。
// 'allow-pointer-lock'：允许指针锁定。
// 'allow-popups'：允许弹出窗口。
// 'allow-popups-to-escape-sandbox'：允许弹出窗口逃逸沙箱。
// 'allow-presentation'：允许演示。
// 'allow-same-origin'：允许同源请求。
// 'allow-scripts'：允许脚本。
// 'allow-top-navigation'：允许顶级导航。


mongoose.connect('mongodb://127.0.0.1:27017/test')
mongoose.connection.on('connected', () => {
    console.log('Mongoose is now connected to the database')
})
  
mongoose.connection.on('error', (err) => {
    console.error('Error while connecting to the database', err)
})


const commentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const Comment = mongoose.model('comment', commentSchema)

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('user', UserSchema)


app.use(cors({

    origin: 'http://localhost:5173', // 网页端的地址
    // origin: 'www', // 网页端的地址
    credentials: true // 允许跨域cookie
}))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World!')
})
const TOKEN = {
    admin: 'admin123',
    normal: 'normal123',
}
// 获取全部用户账号信息
app.get('/getUser', (req, res) => {
    console.log('getUser', req.cookies)
    // 是管理员
    if (req.cookies && req.cookies.token === TOKEN.admin) {
        User.find({}).then((users) => {
            res.send(users)
        })
    } else {
        res.send('no permission')
    }
    // User.find({}).then((users) => {
    //     res.send(users)
    // })
})
// 登录query注入型
app.get('/login-inject', (req, res) => {
    console.log('login-inject', req.query)
    // 提前判断转义 + 具体化表达式而非默认
    // if (typeof req.query.username !== 'string' || typeof req.query.password !== 'string') {
    //     res.send('login failed')
    //     return
    // }
    // User.findOne({username: req.query.username , password: req.query.password }).then((user) => {
    User.findOne().where('username').equals(req.query.username).where('password').equals(req.query.password).then((user) => {
    // User.findOne({username: { $eq: req.query.username }, password: { $eq: req.query.password }}).then((user) => {
        if (user) {
            const token = user.isAdmin ? TOKEN.admin : TOKEN.normal
            res.cookie('token', token, {
                maxAge: 900000,
            })
            res.send({
                isAdmin: user.isAdmin,
                token,
                msg: 'login success',
            })
        } else {
            res.send('login failed')
        }
    }).catch(() => {
        console.error('login-inject error')
        res.send('login failed')
    })
})
// 登录
app.post('/login', (req, res) => {
    console.log('login', req.body)
    User.findOne({username: req.body.username, password: req.body.password}).then((user) => {
        if (user) {
            const token = user.isAdmin ? TOKEN.admin : TOKEN.normal
            res.cookie('token', token, {
                maxAge: 900000,
            })
            res.send({
                isAdmin: user.isAdmin,
                token,
                msg: 'login success',
            })
        } else {
            res.send('login failed')
        }
    })
})
// 修改密码
app.post('/changePassword', (req, res) => {
    console.log('changePassword', req.body)
    User.findOneAndUpdate({username: req.body.username, password: req.body.password}, {username: req.body.username, password: req.body.newPassword}, { new: true }).then((user) => {
        console.log('changePassword user', user)
        if (user) {
            res.send('change success')
        } else {
            res.send('change failed')
        }
    })
})
app.get('/test', (req, res) => {
    res.send('test')
})
// 解析 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// 解析 application/json
app.use(express.json())

// 添加评论
app.post('/addComment', (req, res) => {
    console.log(req.body)
    const comment = new Comment({name: req.body.name, comment: req.body.comment})
    comment.save().then(() => {
        res.send('comment added')
    })
})
// 添加评论
app.get('/getComment', (req, res) => {
    Comment.find({}).then((comments) => {
        res.send(comments)
    })
})

// 获取劫持目标网站
app.get('/clickjacking', (req, res) => {
    res.sendFile(path.join(__dirname, 'clickJacking.html')) // 发送文件
})
// 获取钓鱼csrf网站
app.get('/csrf', (req, res) => {
    res.sendFile(path.join(__dirname, 'csrf.html')) // 发送文件
})
// 获取含有脚本的svg文件
app.get('/svg', (req, res) => {
    res.sendFile(path.join(__dirname, 'unsafe.svg')) // 发送文件
})


const port = 3000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
