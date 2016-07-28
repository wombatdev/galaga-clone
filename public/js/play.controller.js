"use strict";

(function() {
    angular
        .module("galaga")
        .controller("PlayController", [
            "$scope",
            PlayControllerFunction
        ])

    function PlayControllerFunction($scope) {
        var socket = io();
        var vm = this;
        var playerCounter = 0;

        var ship1 = $(".ship1");
        console.log(ship1);
        var bee = $(".bee");

        socket.on('playerJoin', function(msg) {
            var connectCounter = msg;
            if (connectCounter == 2) {
                console.log(msg);
                var player1 = {
                    name: "Player1",
                    keyDown: function() {
                        for (var key in keysDown) {
                            var value = Number(key);
                            if (value == 37) { // left arrow
                                var player1move = {
                                    player: player1,
                                    move: 37
                                };
                                socket.emit('player1move', player1move);
                            } else if (value == 39) { // right arrow
                                var player1move = {
                                    player: player1,
                                    move: 39
                                };
                                socket.emit('player1move', player1move);
                            }  else if (value == 38) { // up arrow
                                var player1move = {
                                    player: player1,
                                    move: 38
                                };
                                socket.emit('player1move', player1move);
                            }  else if (value == 40) { // down arrow
                                var player1move = {
                                    player: player1,
                                    move: 40
                                };
                                socket.emit('player1move', player1move);
                            }
                        };
                    }
                };
                console.log(player1);
                ship1.css('visibility', 'visible');
                // $(document).keydown(function() {
                //     player1.keyDown();
                // });
                var player2 = {
                    name: "Player2",
                    keyDown: function() {
                        for (var key in keysDown) {
                            var value = Number(key);
                            if (value == 65) { // a key
                                var player2move = {
                                    player: player2,
                                    move: 65
                                };
                                socket.emit('player2move', player2move);
                            } else if (value == 68) { // d key
                                var player2move = {
                                    player: player2,
                                    move: 68
                                };
                                socket.emit('player2move', player2move);
                            }  else if (value == 87) { // w key
                                var player2move = {
                                    player: player2,
                                    move: 87
                                };
                                socket.emit('player2move', player2move);
                            }  else if (value == 83) { // s key
                                var player2move = {
                                    player: player2,
                                    move: 83
                                };
                                socket.emit('player2move', player2move);
                            }
                        };
                    }
                };
                console.log(player2.name);
                bee.css('visibility', 'visible');
                $(document).keydown(function() {
                    player1.keyDown();
                    player2.keyDown();
                });
            }
            else {

            }
        });

        var keysDown = {};

        window.addEventListener("keydown", function(event) {
            keysDown[event.keyCode] = true;
        });

        window.addEventListener("keyup", function(event) {
            delete keysDown[event.keyCode];
        });

        socket.on('player1move', function(msg) {
            console.log(msg.move);
            if (msg.move == 37) { // left arrow
                $(".player1").stop().animate({
                                left: '-=100'
                            });
            } else if (msg.move == 39) { // right arrow
                $(".player1").stop().animate({
                                left: '+=100'
                            });
            }  else if (msg.move == 38) { // up arrow
                $(".player1").stop().animate({
                                top: '-=100'
                            });
            }  else if (msg.move == 40) { // down arrow
                $(".player1").stop().animate({
                                top: '+=100'
                            });
            }
        });
        socket.on('player2move', function(msg) {
            console.log(msg.move);
            if (msg.move == 65) { // left arrow
                $(".player2").stop().animate({
                                left: '-=100'
                            });
            } else if (msg.move == 68) { // right arrow
                $(".player2").stop().animate({
                                left: '+=100'
                            });
            }  else if (msg.move == 87) { // up arrow
                $(".player2").stop().animate({
                                top: '-=100'
                            });
            }  else if (msg.move == 83) { // down arrow
                $(".player2").stop().animate({
                                top: '+=100'
                            });
            }
        });
    }
})();
