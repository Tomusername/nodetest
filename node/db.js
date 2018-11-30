



// 3.0 以上 高版本语法
 
const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

console.log('分割一下')


module.exports = router;

//var express = require('express');
var app=express();
 
var bodyParder = require('body-parser'); 
app.use(bodyParder.urlencoded({extended: true}));

//设置跨域访问
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   next();
})

console.log(app)
app.get('/get',function(req,res){
    console.log(req.query)
    mongoClient.Promise = global.Promise;

    mongoClient.connect("mongodb://localhost:27017/gomall",{useNewUrlParser:true}, function(err, client) { assert.equal(null, err);
     
    // gomall 为 数据库名称；
    const db = client.db("gomall");
    // PASS 为 数据库里面的某一个集合；
    const pass = db.collection('users');
    var data = [{id:7,"name":'rose',"age":100},{id:8,"name":'mark',"age":23}];
    
    pass.insert(data, function(err, result) { 
        //如果存在错误
        if(err)
        {
            console.log('Error:'+ err);
            return;
        } 
        //调用传入的回调方法，将操作结果返回
    });
    
    pass.find({name:req.query.name,age:parseInt(req.query.age)}).toArray(function(err, docs) {
     
    assert.equal(err, null);
     
    console.log(docs);
    res.send(docs)
    
    });
     
    }); 
   
});
app.post('/add',function(req,res){
    console.log(req.on)
    res.send('tianjiachenggong')
})
var server=app.listen(8081,function(){
    var host=server.address().address;
    var port =server.address().port;
    console.log('应用实例，访问地址为http://%s:%s',host,port)
})
