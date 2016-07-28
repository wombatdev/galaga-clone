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
            .state("Index", {
                url: "/",
                templateUrl: "/assets/js/index.html",
                controller: "IndexController",
                controllerAs: "IndexViewModel"
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
