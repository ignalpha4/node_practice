import { log } from "console";
import fs from "fs";


// fs.readFile("sample.txt","utf8",(err,data)=>{
//     if(err){
//         console.error("some error occures",err);
//     }

//     console.log(data);
// })


// //for appending the data

// fs.appendFile("sample.txt"," shubham bankar",err=>{
//     if(err){
//         console.log("error");
//     }
// });

// fs.open("sample.txt",'w',(err,file)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log(file);
// })

//overwrites the content
// fs.writeFile("sample.txt","add this to the file",(err)=>{
//     console.error(err);
// })


//different permissions
/*Read/Write/Execute for Owner, Group, and Others (Full permissions):

Octal: 0o777
Symbolic: rwxrwxrwx
Read/Write for Owner, Read for Group and Others:

Octal: 0o644
Symbolic: rw-r--r--
Read/Write/Execute for Owner, Read/Execute for Group and Others:

Octal: 0o755
Symbolic: rwxr-xr-x
Read/Write for Owner, Read/Execute for Group and Others:

Octal: 0o755
Symbolic: rw-r-xr-x
Read/Write for Owner, Read for Group, Read/Execute for Others:

Octal: 0o644
Symbolic: rw-r--r--
Read/Execute for Owner, Group, and Others:

Octal: 0o555
Symbolic: r-xr-xr-x
Read/Write for Owner, No Permissions for Group and Others:

Octal: 0o600
Symbolic: rw------- */

fs.writeFile("sample.txt","hello world",{mode:0o600},(err)=>{
    if(err){
        console.error("error",err);
    }
    console.log("content written successfully");
})