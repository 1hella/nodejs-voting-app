'use strict';

angular.module('workspaceApp')
  .controller('PollCtrl', function($scope, $stateParams, $http, $state) {
    var pollId = $stateParams.id;
    $scope.poll = {};
    $http.get('/api/polls/' + pollId).success(function(poll) {
      $scope.poll = poll;
    }).error(function(err) {
      console.log(err);
      // redirect home on 404 or 500
      $state.go('main');
    });

    /*
     * Add an option to the poll
     */
    $scope.addOption = function(poll, option) {
      $scope.poll.options.push(option);
      $scope.poll.votes.push(1);

      $http.put('/api/polls/' + poll._id, poll).
      success(function(newPoll) {
        // update version number
        $scope.poll.__v = newPoll.__v;
      }).
      error(function(err) {
        console.log(err);
      });
    };

    /*
     * Vote for an option on the poll
     */
    $scope.onChartClick = function(chartElement) {
      if (!chartElement[0]) return;
      var optionName = chartElement[0].label;
      var optionIndex;

      optionIndex = $scope.poll.options.indexOf(optionName);
      $scope.poll.votes[optionIndex] = $scope.poll.votes[optionIndex] + 1;

      $http.put('/api/polls/' + $scope.poll._id, $scope.poll).
      success(function(newPoll) {
        // replace old poll with new poll to avoid
        // problems with the version number
        $scope.poll.__v = newPoll.__v;
      }).
      error(function(err) {
        console.log(err);
      });
    };
  });
