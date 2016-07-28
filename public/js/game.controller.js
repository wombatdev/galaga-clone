"use strict";

(function() {
    angular
        .module("galaga")
        .controller("GameController", [
            "$scope",
            GameControllerFunction
        ])

    function GameControllerFunction($scope) {
        var socket = io();
        var vm = this;

        var canvas = document.createElement('canvas');
        var width = window.innerWidth;
        var height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');

        var animate = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60)
            };
        var step = function() {
            update();
            render();
            animate(step);
        };

        window.onload = function() {
            document.body.appendChild(canvas);
            animate(step);
        };

        function Ship(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.x_speed = 0;
            this.y_speed = 0;
        }

        Ship.prototype.render = function() {
            context.fillStyle = "#0000FF";
            context.fillRect(this.x, this.y, this.width, this.height);
        };

        function Player1() {
            this.ship = new Ship(100, 100, 50, 50);
        }
        function Player2() {
            this.ship = new Ship(300, 100, 50, 50);
        }

        Player1.prototype.render = function() {
            this.ship.render();
        };
        Player2.prototype.render = function() {
            this.ship.render();
        };

        var player1 = new Player1();
        var player2 = new Player2();

        var update = function() {
            player1.update();
            player2.update();
        };

        var render = function() {
            context.fillStyle = "#FF00FF";
            context.fillRect(0, 0, width, height);
            player1.render();
            player2.render();
            // computer.render();
            // ball.render();
        };

        var keysDown = {};

        window.addEventListener("keydown", function(event) {
            keysDown[event.keyCode] = true;
        });

        window.addEventListener("keyup", function(event) {
            delete keysDown[event.keyCode];
        });

        Ship.prototype.move = function(x, y) {
            this.x += x;
            this.y += y;
            this.x_speed = x;
            this.y_speed = y;
            if (this.x < 0) { // all the way to the left
                this.x = 0;
                this.x_speed = 0;
            } else if (this.x + this.width > width) { // all the way to the right
                this.x = width - this.width;
                this.x_speed = 0;
            }
            if (this.y < 0) { // all the way to the top
                this.y = 0;
                this.y_speed = 0;
            } else if (this.y + this.height > height) { // all the way to the bottom
                this.y = height - this.height;
                this.y_speed = 0;
            }
        }

        Player1.prototype.update = function() {
            for (var key in keysDown) {
                var value = Number(key);
                if (value == 37) { // left arrow
                    this.ship.move(-4, 0);
                } else if (value == 39) { // right arrow
                    this.ship.move(4, 0);
                }  else if (value == 38) { // up arrow
                    this.ship.move(0, -4);
                }  else if (value == 40) { // down arrow
                    this.ship.move(0, 4);
                }  else {
                    this.ship.move(0, 0);
                }
            }
        };
        Player2.prototype.update = function() {
            for (var key in keysDown) {
                var value = Number(key);
                if (value == 65) { // a key
                    this.ship.move(-4, 0);
                } else if (value == 68) { // d key
                    this.ship.move(4, 0);
                }  else if (value == 87) { // w key
                    this.ship.move(0, -4);
                }  else if (value == 83) { // s key
                    this.ship.move(0, 4);
                }  else {
                    this.ship.move(0, 0);
                }
            }
        };

        // vm.sendMessage = function() {
        //     socket.emit('chat message', vm.newMessage);
        //     vm.newMessage = "";
        // }
        //
        // socket.on('chat message', function(msg) {
        //     $scope.$apply(function() {
        //         vm.messages.push(msg);
        //     })
        // });

    }

})();
