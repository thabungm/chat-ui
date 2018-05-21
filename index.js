var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3000;

var request = require("request");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/bot.png");
});


botIcon = '<img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">';
userIcon = ''
http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-2.jpg
io.on("connection", function(socket) {
  socket.on("chat message", function(msg) {
    io.emit("chat message", "<div >You: " + msg + "</div>");
    // var json_obj = JSON.parse(data);

    setTimeout(() => {
      request.post(
        {
          headers: { "content-type": "application/json" },
          url: "http://localhost:8080",
          form: JSON.stringify({
            query: msg
          })
        },
        function(error, response, body) {
          body = JSON.parse(body);
          console.log(body["result"]);
          io.emit("chat message", "Bot: " + body["result"]);
        }
      );
    }, 1000);
  });
});

http.listen(port, function() {
  console.log("listening on *:" + port);
});
