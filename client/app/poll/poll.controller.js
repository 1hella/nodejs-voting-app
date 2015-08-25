'use strict';

angular.module('workspaceApp')
  .controller('PollCtrl', function($scope, $stateParams, $http) {
    var pollId = $stateParams.id;
    $scope.poll = {};
    $http.get('/api/polls/' + pollId).success(function(poll) {
      $scope.poll = poll;
    });
  });
