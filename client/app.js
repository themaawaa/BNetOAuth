var labTutorApp = angular.module('labTutorApp', []);

labTutorApp.controller('StartCtrl', [ '$scope', '$http', function ($scope, $http) {

  parseParams = function() {
    var params = {}, queryString = location.hash.substring(1), regex = /([^&=]+)=([^&]*)/g, m;
    while (m = regex.exec(queryString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return params;
  };

  params = parseParams();

  $scope.name = "Name will be inflated here";
  if (params.access_token) {
    $http({
      method: 'GET',
      url: 'https://eu.battle.net/oauth/token' + params.access_token
    }).then(function (response) {
      $scope.name = response.data.name;
    }, function (err) {
      $scope.name = err;
    });
  }

  $scope.login = function() {
    window.location.href = "https://eu.battle.net/oauth/authorize?client_id='INSERT CLIENT ID'&response_type=code&redirect_uri=https%3A%2F%2Flocalhost%3A5000%2F"
  };

}]);
