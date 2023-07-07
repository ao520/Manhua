// 200 成功
// 4001 账号不能为空
// 302 账号已注册
// 303 账号或密码错误
// 304 邮箱格式错误
// 305 验证码发送失败
// 5000 服务器异常


// 查询 
exports.FindOneTable = function ({
    model, query, field, res, callback, msg = "查询成功"
}) {
    model.findOne(query, field)
        .then(result => {
            if (callback) {
                callback(result)
            } else {
                res.json({
                    code: 200,
                    msg: msg,
                    data:result,
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.json({
                code: 5000,
                err,
                msg: '服务器异常'
            })
        })
}

// 查询多条数据
exports.FindTable = function ({
    model, query, field, res, callback, msg = "查询成功",
    skip,//跳过前面多少条数据
    limit,//查询前多少条数据
    sort,//排序
}) {
    model.find(query, field)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .then(result => {
            if (callback) {
                callback(result)
            } else {
                res.json({
                    code: 200,
                    msg: msg,
                    data:result
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.json({
                code: 5000,
                err,
                msg: '服务器异常'
            })
        })
}

// 修改
exports.UpdataTable = function ({
    model, query, field, res, callback, msg = "修改成功"
}) {
    model.updateOne(query, { $set: field })
        .then(result => {
            if (callback) {
                callback(result)
            } else {
                res.json({
                    code: 200,
                    msg: msg,
                    data:result
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.json({
                code: 5000,
                err,
                msg: '服务器异常'
            })
        })
}

// 添加多条数据也可以一条
exports.InsertTable = function ({
    model,
    data,
    callback,
    msg = "添加成功",
    res
}) {
    model.insertMany(data)
        .then(result => {
            if (callback) {
                callback(result)
            } else {
                res.json({
                    code: 200,
                    msg,
                    data:result
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.json({
                code: 5000,
                err,
                msg: '服务器异常'
            })
        })
}

// 删除多条数据也可以一条
exports.RemoveTable = function ({
    model,
    query,
    callback,
    msg = "删除成功",
    res
}) {

    if (Object.keys(query).length!=0) {
        model.remove(query)
            .then(result => {
                if (callback) {
                    callback(result)
                } else {
                    res.json({
                        code: 200,
                        msg,
                        data:result
                    })
                }
            })
            .catch(err => {
                console.log(err)
                res.json({
                    code: 5000,
                    err,
                    msg: '服务器异常'
                })
            })
    } else {
        res.json({
            code: 401,
            msg: '参数不全无法删除'
        })
    }
}