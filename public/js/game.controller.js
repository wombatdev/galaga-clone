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
        canvas.setAttribute("id", "background");
        var width = window.innerWidth;
        var height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');

        var animate = window.requestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60)
            };

        var step = function() {
            update();
            render();
            animate(step);
            // game.background.draw();
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
                    socket.emit('player1move', 37);
                } else if (value == 39) { // right arrow
                    socket.emit('player1move', 39);
                }  else if (value == 38) { // up arrow
                    socket.emit('player1move', 38);
                }  else if (value == 40) { // down arrow
                    socket.emit('player1move', 40);
                }  else {
                    this.ship.move(0, 0);
                }
                };
            socket.on('player1move', function(msg) {
                if (msg == 37) { // left arrow
                    player1.ship.move(-1, 0);
                } else if (msg == 39) { // right arrow
                    player1.ship.move(1, 0);
                }  else if (msg == 38) { // up arrow
                    player1.ship.move(0, -1);
                }  else if (msg == 40) { // down arrow
                    player1.ship.move(0, 1);
                }
            });

        }
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

        // socket.on('chat message', function(msg) {
        //     $scope.$apply(function() {
        //         vm.messages.push(msg);
        //     })
        // });

        var imageRepository = new function() {
            // Define images
            this.background = new Image();
            // Set images src
            this.background.src = "/assets/images/background.png";
        }

        /**
         * Creates the Drawable object which will be the base class for
         * all drawable objects in the game. Sets up default variables
         * that all child objects will inherit, as well as the default
         * functions.
         */
        function Drawable() {
            this.init = function(x, y) {
                // Default variables
                this.x = x;
                this.y = y;
            }
            this.speed = 0;
            this.canvasWidth = 0;
            this.canvasHeight = 0;
            // Define abstract function to be implemented in child objects
            this.draw = function() {};
        }

        /**
         * Creates the Background object which will become a child of
         * the Drawable object. The background is drawn on the "background"
         * canvas and creates the illusion of moving by panning the image.
         */
        function Background() {
            this.speed = 1; // Redefine speed of the background for panning
            // Implement abstract function
            this.draw = function() {
                // Pan background
                this.y += this.speed;
                this.context.drawImage(imageRepository.background, this.x, this.y);
                // Draw another image at the top edge of the first image
                this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);
                // If the image scrolled off the screen, reset
                if (this.y >= this.canvasHeight)
                    this.y = 0;
            };
        }
        // Set Background to inherit properties from Drawable
        Background.prototype = new Drawable();

        /**
         * Creates the Game object which will hold all objects and data for
         * the game.
         */

        function Game() {
            /*
             * Gets canvas information and context and sets up all game
             * objects.
             * Returns true if the canvas is supported and false if it
             * is not. This is to stop the animation script from constantly
             * running on older browsers.
             */
            this.init = function() {
                // Get the canvas element
                this.bgCanvas = document.getElementById('background');
                // Test to see if canvas is supported
                if (this.bgCanvas.getContext) {
                    this.bgContext = this.bgCanvas.getContext('2d');
                    // Initialize objects to contain their context and canvas
                    // information
                    Background.prototype.context = this.bgContext;
                    Background.prototype.canvasWidth = this.bgCanvas.width;
                    Background.prototype.canvasHeight = this.bgCanvas.height;
                    // Initialize the background object
                    this.background = new Background();
                    this.background.init(0, 0); // Set draw point to 0,0
                    return true;
                } else {
                    return false;
                }
            };
            // Start the animation loop
            this.start = function() {
                animate(step);
            };
        }

        /**
         * The animation loop. Calls the requestAnimationFrame shim to
         * optimize the game loop and draws all game objects. This
         * function must be a gobal function and cannot be within an
         * object.
         */
        // function animate() {
        //     requestAnimFrame(animate);
        //     game.background.draw();
        // }
        // /**
        //  * requestAnim shim layer by Paul Irish
        //  * Finds the first API that works to optimize the animation loop,
        //  * otherwise defaults to setTimeout().
        //  */
        // window.requestAnimFrame = (function() {
        //     return window.requestAnimationFrame ||
        //         window.webkitRequestAnimationFrame ||
        //         window.mozRequestAnimationFrame ||
        //         window.oRequestAnimationFrame ||
        //         window.msRequestAnimationFrame ||
        //         function( /* function */ callback, /* DOMElement */ element) {
        //             window.setTimeout(callback, 1000 / 60);
        //         };
        // })();

        /**
         * Initialize the Game and starts it.
         */
        var game = new Game();

        function init() {
            if (game.init())
                game.start();
        }

        init();

    }

})();
