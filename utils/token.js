//code状态码
const { state } = require('./state')
// 加密和解密  jwt

const jwt = require('jsonwebtoken')
const keys = "changAO19991115"


// 加密
exports.createToken = function(data){
    return jwt.sign(data,keys,{expiresIn:'2h'}) // 生成token  2h 2小时
}


// 解密 
// 校验token 

// 1. token 不存在
// 2. token 验证失败 (token 过期 或者错误)
// 3. token 校验成功 
exports.checkToken = function(req,res,callback){
    // var token = req.headers.token;
    let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFyIjoiMjAyMy0wNy0wNiAyMDowOTowMSIsInVzZXJuYW1lIjoiYW9hbyIsInBob25lIjoiMTc2MDcxNjY3MTMiLCJwYXNzd29yZCI6ImFvMTk5OTExMTUiLCJlbWFpbCI6Ijc2NTE4ODA2MkBxcS5jb20iLCJlbmQiOiIyMDIzLTA3LTA2IDIyOjA5OjAxIiwiaWF0IjoxNjg4NjQ1MzQxLCJleHAiOjE2ODg2NTI1NDF9.wkHJdloXW89nuFqZdKX9RdP1-n-81rYeD5-pIxL1wzc"
    if(token){
        jwt.verify(token,keys,(err,data)=>{
            if(err){
                res.json(state[1002])
            }else{
                callback(data)
            }
        })
    }else{
        res.json(state[1003])
    }
}


