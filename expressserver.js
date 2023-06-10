const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
//reuest end point
app.get('/', (req, res) => {
  res.send('Hello World from express')
})
//html1 route or we can call this as named route
app.get('/html1', (req, res) => {
    //__dirname is an environment variable  which provides absolute path of the directory
    //of current executed file
    res.sendFile(path.join(__dirname,'index.html'))
  })
  //named route
  app.get('/getMovies', (req, res) => {
    fs.readFile('./data/db.json',(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            //res.send(JSON.stringify(result))
            res.send(JSON.parse(result))
        }
    })
  })

  //named parametererized route
  app.get('/getMovies/:id', (req, res) => {
    //console.log("param:",req.params.id)
    fs.readFile('./data/db.json',(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            if(req.params.id){
                const returnObj = null;
                const data = JSON.parse(result);
                for(let index = 0; index < data.length; index++){
                    if(req.params.id === data[index]._id){
                        returnObj = data[index]
                    }
                    //cant send response multiple times
                    // else{
                    //     res.send("data not found")
                    // }

                }
                if(returnObj){
                    res.send(returnObj)
                }
                else{
                    res.send("Id not found")
                    console.log("No Id found")
                }
                //console.log(data)
            }
            else{
                res.send("Id not found")
            }
            //res.send(JSON.stringify(result))
            //res.send(JSON.parse(result))
        }
    })
  })
app.listen(3000)