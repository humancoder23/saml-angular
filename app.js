const app = angular.module('samlApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'public/home.html',
      controller: 'HomeController',
    })
    .when('/login', {
      templateUrl: 'public/login.html',
      controller: 'LoginController',
    })
    .otherwise({
      redirectTo: '/login',
    });
});
