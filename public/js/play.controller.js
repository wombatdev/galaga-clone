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

        var ship1 = $(".player1");
        console.log(ship1);
        var bee = $(".player2");

        socket.on('player1', function(msg) {
            console.log(msg);
            var player1 = msg;
            ship1.css('visibility', 'visible');
        });



        var keysDown = {};

        window.addEventListener("keydown", function(event) {
            keysDown[event.keyCode] = true;
        });

        window.addEventListener("keyup", function(event) {
            delete keysDown[event.keyCode];
        });

        vm.keyDown = function() {
            for (var key in keysDown) {
                var value = Number(key);
                if (value == 37) { // left arrow
                    socket.emit('player1move', 37);
                } else if (value == 39) { // right arrow
                    socket.emit('player1move', 39);
                }  else if (value == 38) { // up arrow
                    socket.emit('player1move', 38);
                }  else if (value == 40) { // down arrow
                    socket.emit('player1move', 40);
                }
                };
            socket.on('player1move', function(msg) {
                console.log(msg);
                if (msg == 37) { // left arrow
                    $("div").stop().animate({
                                    left: '-=40'
                                });
                } else if (msg == 39) { // right arrow
                    $("div").stop().animate({
                                    left: '+=40'
                                });
                }  else if (msg == 38) { // up arrow
                    $("div").stop().animate({
                                    top: '-=40'
                                });
                }  else if (msg == 40) { // down arrow
                    $("div").stop().animate({
                                    top: '+=40'
                                });
                }
            });
        }
        $(document).keydown(function() {
            console.log("keydown");
            vm.keyDown();
        });



        // $(document).keydown(function(e) {
        //     console.log("keydown");
        //     switch (e.which) {
        //         case 37:
        //             $("div").stop().animate({
        //                 left: '-=20'
        //             }); //left arrow key
        //             break;
        //         case 38:
        //             $("div").stop().animate({
        //                 top: '-=20'
        //             }); //up arrow key
        //             break;
        //         case 39:
        //             $("div").stop().animate({
        //                 left: '+=20'
        //             }); //right arrow key
        //             break;
        //         case 40:
        //             $("div").stop().animate({
        //                 top: '+=20'
        //             }); //bottom arrow key
        //             break;
        //     }
        // })

    }

})();
