const util = require('util'),
    exec = require('child_process').exec;
    const archiver = require('./archiver');


module.exports=(io,data)=>{

let website ="";
const child = exec(`wget --no-parent --mirror --convert-links --adjust-extension --page-requisites --no-if-modified-since --no-parent ${data.website}`);

// read stdout from the current child.
child.stderr.on("data",(response)=>{

    if(response.startsWith("Resolving "))
    {
        website= response.substring(response.indexOf('Resolve ')+11,response.indexOf(' ('))
    }
    io.emit(data.token,{progress:response})
})

child.stderr.on('close',(response)=>{

    io.emit(data.token,{progress:"Converting"})
    archiver(website,io,data)
})
}
