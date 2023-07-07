const express = require('express');
const moment = require('moment');//时间格式化
const fs = require('fs');
const ejs = require('ejs');//邮箱模板

const router = express.Router();
//token加解密
const { createToken, checkToken } = require('../utils/token')
//数据库操作
const { Userinfos, Emailcodes } = require('../mongo/model')
const { FindOneTable, FindTable, UpdataTable, InsertTable, RemoveTable } = require('../utils/index')

//邮箱
const { transporter } = require('../email')
//生成验证码
const randToken = require('rand-token');

//正则
const { reg } = require('../utils/validate')
//code状态码
const { state } = require('../utils/state')

router.get('/ceshi', async (req, res) => {
    checkToken(req, res, result => {
        console.log(result);
        let { username, password, iat, exp } = result
        let creat = moment.unix(iat).format('YYYY-MM-DD HH:mm:ss')
        let expire = moment.unix(exp).format('YYYY-MM-DD HH:mm:ss')
        res.json({
            code: 200,
            data: {
                username,
                password,
                creat,
                expire
            }
        })
    })
});

router.get('/login', async (req, res) => {
    let { username, password } = req.query
    if ((reg.phone.test(username) || reg.email.test(username)) && reg.password.test(password)) {
        FindOneTable({
            model: Userinfos,
            query: { $or: [{ phone: username }, { email: username }], password },
            callback: (result) => {
                if (result) {
                    const token = createToken({
                        star: moment().format('YYYY-MM-DD HH:mm:ss'),
                        username: result.username,
                        phone: result.phone,
                        password: result.password,
                        email: result.email,
                        end: moment().add(2, 'hours').format('YYYY-MM-DD HH:mm:ss'),
                    })
                    res.json({
                        code: 200,
                        msg: "登录成功",
                        token
                    })
                } else {
                    res.json(state[2007])
                }
            }
        })
    } else {
        if (!reg.null.test(username)) {
            res.json(state[1001])
        } else if (!reg.phone.test(username) && !reg.email.test(username)) {
            res.json(state[2006])
        } else if (!reg.password.test(password)) {
            res.json(state[2001])
        }
    }
});

router.get('/email', async (req, res) => {
    const { email } = req.query
    if (reg.email.test(email)) {
        // 生成长度为 6 的随机令牌
        const code = randToken.uid(6);
        // 读取模板文件
        const template = fs.readFileSync('../Manhua/email/email.ejs', 'utf8');
        // 渲染邮箱模板
        const html = ejs.render(template, { email, code });
        const mailOptions = {
            from: 'youyuan066@163.com', // 发件人邮箱
            to: email, // 收件人邮箱
            subject: 'Verification Code', // 邮件主题
            text: html, // 邮件正文
        };
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                res.json(state[4000])
            } else {
                const star = moment()
                const end = moment().add(5, 'minutes')
                FindOneTable({
                    model: Emailcodes,
                    query: { email },
                    callback: (result) => {
                        if (result) {
                            UpdataTable({
                                model: Emailcodes,
                                query: { email },
                                field: { code, star, end },
                                callback: () => {
                                    res.json({
                                        code: 200,
                                        msg: '验证码已发送，注意查收',
                                    })
                                }
                            })
                        } else {
                            InsertTable({
                                model: Emailcodes,
                                data: { email, code, star, end },
                                callback: () => {
                                    res.json({
                                        code: 200,
                                        msg: '验证码已发送，注意查收',

                                    })
                                }
                            })
                        }
                    }
                })
            }
        });
    } else {
        res.json(state[2003])
    }
})

router.get('/register', async (req, res) => {
    let { username, password, email, phone, code } = req.query
    if (reg.null.test(username) && reg.phone.test(phone) && reg.password.test(password) && reg.email.test(email) && reg.code.test(code)) {
        FindOneTable({
            model: Userinfos,
            query: { username },
            callback: (result) => {
                if (result) {
                    res.json(state[3000]);
                } else {
                    FindOneTable({
                        model: Userinfos,
                        query: { phone },
                        callback: (result) => {
                            if (result) {
                                res.json(state[3001]);
                            } else {
                                FindOneTable({
                                    model: Userinfos,
                                    query: { email },
                                    callback: (result) => {
                                        if (result) {
                                            res.json(state[3002]);
                                        } else {
                                            FindOneTable({
                                                model: Emailcodes,
                                                query: { email },
                                                callback: (result) => {
                                                    if (result) {
                                                        if (result.code == code && moment().isBefore(result.end)) {
                                                            InsertTable({
                                                                model: Userinfos,
                                                                data: { username, phone, password, email, create: moment(), update: moment() },
                                                                callback: (result) => {
                                                                    if (result) {
                                                                        const token = createToken({
                                                                            star: moment().format('YYYY-MM-DD HH:mm:ss'),
                                                                            username: username,
                                                                            phone: phone,
                                                                            password: password,
                                                                            email: email,
                                                                            end: moment().add(2, 'hours').format('YYYY-MM-DD HH:mm:ss'),
                                                                        })
                                                                        res.json({
                                                                            code: 200,
                                                                            msg: "注册成功",
                                                                            token
                                                                        })
                                                                    }
                                                                }
                                                            });
                                                        } else if (result.code != code) {
                                                            res.json(state[2004]);
                                                        } else if (moment().isAfter(result.end)) {
                                                            res.json(state[3003]);
                                                        }
                                                    } else {
                                                        res.json(state[2005]);
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }
    else {
        if (!reg.null.test(username)) {
            res.json(state[1000])
        } else if (!reg.phone.test(phone)) {
            res.json(state[2000])
        } else if (!reg.password.test(password)) {
            res.json(state[2001])
        } else if (!reg.email.test(email)) {
            res.json(state[2002])
        } else if (!reg.code.test(code)) {
            res.json(state[2003])
        }
    }
});

module.exports = router;