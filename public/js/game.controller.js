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
