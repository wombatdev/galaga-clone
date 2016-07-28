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
            // .state("Show", {
            //     url: "/restaurants/:name",
            //     templateUrl: "/assets/js/show.html",
            //     controller: "ShowController",
            //     controllerAs: "ShowViewModel"
            // })
        $urlRouterProvider.otherwise("/")
    }

})();
