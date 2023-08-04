// Download full website pages.
const wget = require('./wget');

module.exports=(io)=>{

    io.on('connection', function (socket) {
        socket.on('request', function (data) {
            console.log("Request connection received %s",data.token)
            // now graphing the website
            wget(io,data)
        });
      });
}
