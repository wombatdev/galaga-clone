"use strict";

(function() {
    angular
        .module("galaga")
        .controller("IndexController", [
            "$scope",
            IndexControllerFunction
        ])

    function IndexControllerFunction($scope) {
        var vm = this;
        vm.messages = [];
        vm.newMessage = '';
        var socket = io();

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
