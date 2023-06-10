const http = require('http');
const app = http.createServer(function(request,response){
    response.write("welcome to Sonali's shitty life")
    response.end();
})
app.listen(3000,function(){
    console.log("server started with port number 3000");
})