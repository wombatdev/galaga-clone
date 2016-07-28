"use strict";

(function() {
    angular
        .module("galaga")
        .controller("WelcomeController", [
            "$scope",
            WelcomeControllerFunction
        ])

    function WelcomeControllerFunction($scope) {
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
