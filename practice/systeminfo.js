import os from "os"


console.log( os.platform());
console.log(os.type());
console.log( os.arch());
console.log( os.release());


//uptime

console.log(os.uptime(),"seconds");

//cpu info

console.log(os.cpus()[0].model);

//users info

console.log("username: ",os.userInfo().username);

//network interface

console.log(os.networkInterfaces());    