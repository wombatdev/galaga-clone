var express = require("express");
var app = express();
var parser = require("body-parser");
var hbs = require("express-handlebars");
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");

app.engine(".hbs", hbs({
    extname: ".hbs",
    partialsDir: "views/",
    layoutsDir: "views/",
    defaultLayout: "layout-main"
}));

app.use("/assets", express.static("public"));
app.use(parser.json({
    extended: true
}))

app.get('/*', function(req, res) {
    res.render('game');
});

io.on('connection', function(socket) {
    io.emit('player1', 'player1');
    console.log("player joined");
    socket.on('player1move', function(msg) {
        console.log(msg);
        io.emit('player1move', msg);
    });
});

http.listen(3001, function() {
    console.log("We're online on *:3001");
});
