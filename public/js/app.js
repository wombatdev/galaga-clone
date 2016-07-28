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
            .state("Play", {
                url: "/play",
                templateUrl: "/assets/js/play.html",
                controller: "PlayController",
                controllerAs: "PlayViewModel"
            })
        $urlRouterProvider.otherwise("/")
    }

})();
