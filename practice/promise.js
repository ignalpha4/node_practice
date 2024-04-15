import fs from "fs";


const readFilePromise=new Promise((resolve,reject)=>{

    //here the third parameter is the callback function
    fs.readFile("sample.txt","utf8",(err,data)=>{  
        if(err){
            reject(err);
            return;
        }
        resolve(data);
    })
});

readFilePromise.then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.error("file cannot be accessed",err);
})