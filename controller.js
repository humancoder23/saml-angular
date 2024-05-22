app.controller('HomeController', function($scope) {
    $scope.message = 'Welcome to the Home Page!';
  });
  
  app.controller('LoginController', function($scope, $window) {
    $scope.login = function() {
      $window.location.href = '/login';
    };
  });
  