"use strict";

(function() {

    angular
        .module("galaga", [
            "ngResource",
            "ui.router"
        ])
        .config([
            "$stateProvider",
            "$locationProvider",
            "$urlRouterProvider",
            RouterFunction
        ])

    function RouterFunction($stateProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true)
        $stateProvider
            .state("Welcome", {
                url: "/",
                templateUrl: "/assets/js/welcome.html",
                controller: "WelcomeController",
                controllerAs: "WelcomeViewModel"
            })
            .state("Game", {
                url: "/play",
                templateUrl: "/assets/js/game.html",
                controller: "GameController",
                controllerAs: "GameViewModel"
            })
        $urlRouterProvider.otherwise("/")
    }

})();
