var http=require('http');
server=http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.end("hello world");

})
server.listen(8000,'127.0.0.1')
console.log('server is runing at 127.0.0.1:8000')