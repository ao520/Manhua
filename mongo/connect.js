const mongoose = require('mongoose')

const hostname = '127.0.0.1'
const port = 27017
const dbname = 'manhua'

const DB_URL = "mongodb://" + hostname + ":" + port + '/' + dbname

mongoose.connect(DB_URL).then(() => {
    console.log('数据库连接成功');
}).catch((err) => {
    console.error('数据库连接失败:', err);
});