const mongoose=require('mongoose')
const Schema=mongoose.Schema
// 用户表
const Userinfos=new Schema({
    username:String,
    phone:String,
    password:String,
    email:String,
    avatar:String,   
    create:Date,
    update:Date, 
})
//邮箱验证码
const Emailcodes=new Schema({
    email:String,
    code:String,
    star:Date,
    end:Date,
})

exports.Userinfos=mongoose.model('userinfos',Userinfos)
exports.Emailcodes=mongoose.model('emailcodes',Emailcodes)
// // 权限表
// const Myrole=new Schema({
//     text:String,
//     id:Number,
//     value:Number,
//     color:String 
// })
// // 学科表
// const Myxueke = new Schema({
//     name:String,
//     id:Number,
//     value:String,
// })
// // 班级表
// const Mybanji = new Schema({
//     xueke:String,
//     year:Number,
//     num:Number,
//     name:String, 
//     value:String,  
// })
// // 面试题表
// const Mymianshi = new Schema({
//     question:String,
//     answer:String,
//     time:Date,
//     info:Object,
//     heat:Number
// })
// const MyMainShi = new Schema({
//     author:Object,
//     title:String,
//     type:String,
//     cate:String,
//     content:String,
//     answer:String,
//     score:Number,  // 0  有答案 10  看一次加一分 点赞加2分  收藏加3分  评论加2分 
//     time:Date, 
//     like:Number,
//     collect:Number,
//     ping:Number 
// })
// // 公告表
// const Myanno = new Schema({
//     name:String,
//     type:Number,
//     desc:String,
//     content:String,
//     author:String,
//     info:Object,
//     time:Date,
//     image:Array,
//     userId:String,
// })
// // 意见表
// const Myadvise = new Schema({
//     username:String,
//     info:Object,
//     content:String,
// })
// // 面试题评论表
// const Mymscomment=new Schema({
//     id:String,
//     info:Object,
//     comment:String,
//     time:Date,
// })
// // 喜欢表
// const Mylike=new Schema({
//     id:String,
//     info:Object,
// })
// // 考勤表
// const Mykaoqin=new Schema({
//     info:Object,
//     time:Date,
//     start_time:Date,
//     end_time:Date,
//     reason:String,
//     type:Number,
// })
// // 成绩表
// const Mychengji=new Schema({
//     info:Object,
//     time:Date,
//     fen:Number,
//     banji:String,
//     xueke:String,
// })
// // 商品表
// const Myshop=new Schema({
//     name:String,
//     price:Number,
//     discount:Number,
//     dateTimeRange:Object,
//     startime:Date,
//     endtime:Date,
//     desc:String,
//     image:Object,
//     time:Date,
//     userId:String
// })
// // 电影表
// const Mymovie = new Schema({
//     "genres":Array,
//     "casts": Array,
//     "directors":Array,
//     "rating": Object,
//     "title": String,
//     "collect_count": Number,
//     "original_title": String,
//     "subtype": String,
//     "year": String,
//     "images": Object,
//     "alt": String,
//     "id": String
// })

// exports.Myuser=mongoose.model('users',Myuser)
// exports.Mymovie=mongoose.model('movies',Mymovie)
// exports.Myrole=mongoose.model('roles',Myrole)
// exports.Myxueke=mongoose.model('xuekes',Myxueke)
// exports.Mybanji=mongoose.model('banjis',Mybanji)
// exports.Myms=mongoose.model('ms',Mymianshi)
// exports.MyMainShi = mongoose.model('mainshis',MyMainShi)
// exports.Myanno=mongoose.model('annos',Myanno)
// exports.Myadvise=mongoose.model('advises',Myadvise)
// exports.Mymscomment=mongoose.model('mscomments',Mymscomment)
// exports.Mylike=mongoose.model('likes',Mylike)
// exports.Mykaoqin=mongoose.model('kaoqins',Mykaoqin)
// exports.Mychengji=mongoose.model('chengjis',Mychengji)
// exports.Myshop=mongoose.model('shops',Myshop)