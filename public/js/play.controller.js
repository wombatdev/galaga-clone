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
        var bee = $(".bee");

        var keysDown = {};
        window.addEventListener("keydown", function(event) {
            keysDown[event.keyCode] = true;
        });
        window.addEventListener("keyup", function(event) {
            delete keysDown[event.keyCode];
        });
        socket.on('playerJoin', function(msg) {
            var connectCounter = msg;
            if (connectCounter == 2) {
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
                            }  else if (value == 32) { // space bar
                                    var player2move = {
                                        player: player2,
                                        move: 32
                                    };
                                socket.emit('player2move', player2move);
                            }
                        };
                    }
                };
                bee.css('visibility', 'visible');
            }
            else {

            }
            $(document).keypress(function() {
                player1.keyDown();
                player2.keyDown();
            });
        });

        socket.on('player1move', function(msg) {
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
            }  else if (msg.move == 32) { // space bar
                vm.fire = function() {
                    var bee = $(".bee");
                    var position = bee.offset();
                    var bullet = document.createElement("div");
                    console.log(bullet);
                    bullet.className = "bullet";
                    bullet.style.top = position.top-3+"px";
                    bullet.style.left = position.left+21+"px";
                    $(bullet).appendTo($("body"));
                    $(bullet).animate({
                        top: "-=1000"
                    }, 2000);
                }
                vm.fire();
            }
        });
    }
})();
