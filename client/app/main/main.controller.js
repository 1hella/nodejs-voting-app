'use strict';

angular.module('workspaceApp')
  .controller('MainCtrl', function($scope, $http, $state, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.labels = ['Pepsi', 'Coca-Cola'];
    $scope.data = [1, 10];
    $scope.polls = [{
      options: ['label1', 'label2'],
      votes: [0, 1]
    }];

    getPolls();

    /* todo: sort by date */
    function getPolls() {
      $http.get('/api/polls').then(function(polls) {
        $scope.polls = polls.data;
      }, function error(err) {
        console.log(err);
      });
    }

    /*
     * Add an option to a poll
     */
    $scope.addOption = function(poll, option) {
      var pollIndex = $scope.polls.indexOf(poll);
      $scope.polls[pollIndex].options.push(option);
      $scope.polls[pollIndex].votes.push(1);

      $http.put('/api/polls/' + poll._id, poll).
      success(function(newPoll) {
        // update version number
        $scope.polls[pollIndex].__v = newPoll.__v;
      }).
      error(function(err) {
        console.log(err);
      });
    };

    /*
     * Vote for an option on a poll
     */
    $scope.onChartClick = function(chartElement, event) {
      if (!chartElement[0]) return;

      if (!$scope.isLoggedIn()) {
        $state.go('login');
        return;
      }

      var optionName = chartElement[0].label;
      var pollId = event.srcElement.id;
      var poll = $scope.polls.filter(function(poll) {
        return poll._id === pollId;
      })[0];
      var pollIndex = $scope.polls.indexOf(poll);
      var optionIndex = poll.options.indexOf(optionName);

      poll.votes[optionIndex] = poll.votes[optionIndex] + 1;
      $http.put('/api/polls/' + poll._id, poll).
      success(function(newPoll) {
        // update version number
        $scope.polls[pollIndex].__v = newPoll.__v;
      }).
      error(function(err) {
        console.log(err);
      });
    };
  });
