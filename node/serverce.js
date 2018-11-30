const MongoClient = require('mongodb').MongoClient;
const express = require('express')
const url = 'mongodb://localhost:27017/goshop';
const assert = require('assert');
const mutipart = require('connect-multiparty')
var mutipartMiddeware = mutipart();
var multer = require('multer'); //接收图片
const fs = require("fs");
var ObjectID = require('mongodb').ObjectID;
// const formmidable=require('formmidable')
const app = express()
var bodyParder = require('body-parser');
app.use(bodyParder.urlencoded({
    extended: true
}));

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", " ,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '  .2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})
MongoClient.connect(url, {
    useNewUrlParser: true
}, (err, res) => {
    if (err) {
        throw err
    }
    console.log('数据库已创建')
    const db = res.db('goshop')
    var data = [{
        id: 7,
        "name": 'rose',
        "age": 1000,
        password: 123456
    }, {
        id: 8,
        "name": 'mark',
        "age": 23,
        password: 654321
    }];

    db.collection('users').insert(data, function (err, res) {
        if (err) {
            throw err
        }
        console.log(res)
    })
})
/*登录接口 */
app.post('/login1', function (req, res) {
    console.log(req.body)
    const name = req.body.name;
    const password = req.body.password;
    MongoClient.Promise = global.Promise;
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, (err, db) => {
        const dbs = db.db('goshop')
        if (err) {
            console.log('Error:' + err)
        }
        dbs.collection('user').find({
            name: name
        }, function (err, users) {
            if (err) {
                throw err
            }
            console.log(res)
            // if(users.length===0){
            //     res.send({isSuccess:false,message:'该用户不存在'})

            // }else if(users[0].password === password){
            //     res.send({isSuccess: true, message: '登录成功'});


            // }else if(users[0].password !== password){
            //     res.send({isSuccess: false, message: '密码不正确，请重新输入'});
            // }

        })
    })

})


app.post('/update', function (req, res) {
    console.time('start');
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        const dbs = db.db('goshop')
        if (err) throw err;
        //var whereStr={_id:ObjectID("5bebfd418641d64b68bfc385")};
        var whereStr = {
            name: 'rose'
        };
        var updateStr = {
            $set: {
                'age': 10
            }
        }
        // dbs.collection('users').updateMany(whereStr,updateStr,function(err,res){
        //     if (err) throw err;
        //     console.log("更新成功");
        // })
        dbs.collection('users').insertOne({
            _id: ObjectID("5bebfd418641d64b68bfc385"),
            name: 'are you ok?',
            age: 1
        }, function (err, data) {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message
                })
            } else {
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        count: data.length,
                        list: data
                    }

                })
            }
        })
        console.log(db)
       
        console.timeEnd('start');

    })
})
app.get('/getUserList', function (req, res) {
    MongoClient.Promise = global.Promise;
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, (err, db) => {
        const dbs = db.db('goshop')
        if (err) {
            console.log('Error:' + err);
            return;
        }
        dbs.collection('users').find({
            name: 'mark'
        }).toArray(function (err, data) {
            assert.equal(err, null);
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message
                })

            } else {
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        count: data.length,
                        list: data
                    }
                })
            }
        })
    })
})


var upload = multer({
    dest: './uploads'
}); //定义图片上传的临时目录 

app.post('/upload', upload.array('imageFile', 5), function (req, res, next) {

    // req.files 是 前端表单name=="imageFile" 的多个文件信息（数组）,限制数量5，应该打印看一下
    for (var i = 0; i < req.files.length; i++) {
        // 图片会放在uploads目录并且没有后缀，需要自己转存，用到fs模块
        // 对临时文件转存，fs.rename(oldPath, newPath,callback);
        fs.rename(req.files[i].path, "upload/" + req.files[i].originalname, function (err,data) {
            if (err) {
                throw err;
            }
           
            console.log('done!');
        })
        // fs.readFile('upload/sample.txt','utf-8',function(err,content){
        //     res.json({
        //         data:content
        //     })

        // })
    }

    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*" //允许跨域。。。
    });
    // req.body 将具有文本域数据, 如果存在的话
    res.end(JSON.stringify(req.files) + JSON.stringify(req.body));
})


app.get('/load',function(req,res,next){
    var path="E:/project/node/upload/abc.png";
    let option={
        flags: 'r',//指定用什么模式打开文件，’w’代表写，’r’代表读，类似的还有’r+’、’w+’、’a’等
        encoding: 'utf8',//指定打开文件时使用编码格式，默认就是“utf8”，你还可以为它指定”ascii”或”base64”
        fd: null,//fd属性默认为null，当你指定了这个属性时，createReadableStream会根据传入的fd创建一个流，忽略path。另外你要是想读取一个文件的特定区域，可以配置start、end属性，指定起始和结束（包含在内）的字节偏移
        mode: 0666,
        autoClose: true//autoClose属性为true（默认行为）时，当发生错误或文件读取结束时会自动关闭文件描述符
    }
  var f = fs.createReadStream(path,option);
  
  console.log(res)
 
  res.writeHead(200, {
    'Content-Type': 'application/force-download',
    'Content-Disposition': 'attachment; filename=abc.png'
  });

  console.log(res)

  f.pipe(res);

})

console.log(app)
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址为http://%s:%s', host, port)
})

app.post('/redfile',function(err,res){
    
    if(err){
        throw err
    }
    //res.send('shinima')
    // fs.readFile('upload/sample.txt','utf-8',function(err,content){
    //     //let keyword=content.substring(0,5)
    //     res.send(content)
    //     console.log(content)
    
    // })

})
