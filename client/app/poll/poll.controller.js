'use strict';

angular.module('workspaceApp')
  .controller('PollCtrl', function($scope, $stateParams, $http, $state) {
    var pollId = $stateParams.id;
    $scope.poll = {};
    $http.get('/api/polls/' + pollId).success(function(poll) {
      $scope.poll = poll;
    }).error(function(err) {
      // redirect home on 404 or 500
      $state.go('main');
    });

    /*
     * Vote for an option on a poll
     */
    $scope.onChartClick = function(chartElement) {
      var optionName = chartElement[0].label;
      var optionIndex;

      optionIndex = $scope.poll.options.indexOf(optionName);
      $scope.poll.votes[optionIndex] = $scope.poll.votes[optionIndex] + 1;

      $http.put('/api/polls/' + $scope.poll._id, $scope.poll).
      success(function(newPoll) {
        // replace old poll with new poll to avoid
        // problems with the version number
        $scope.poll.__v = newPoll.__v;
        console.log('success', newPoll);
      }).
      error(function(err) {
        console.log(err);
      });
    };
  });
