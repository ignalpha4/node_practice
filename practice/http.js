import http from 'http';
import fs from "fs";




// http.createServer((req,res)=>{

//   res.writeHead(200,{"Content-Type":"text/html"});
//   res.end("hello world");
// }).listen(8000);


//we can write this as

let server=http.createServer((req,res)=>{
  res.writeHead(200,{"Content-Type":"text/html"});
  res.end("hey there");
});

server.listen(3000,()=>{
  console.log("Server running on port 3000");
})

