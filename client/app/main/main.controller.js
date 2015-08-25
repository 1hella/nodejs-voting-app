'use strict';

angular.module('workspaceApp')
  .controller('MainCtrl', function($scope, $http, Auth) {
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
     * Vote for an option on a poll
     */
    $scope.onChartClick = function(chartElement, event) {
      console.log(chartElement);
      var optionName = chartElement[0].label;
      var pollId = event.srcElement.id;
      var poll = $scope.polls.filter(function(poll) {
        return poll._id === pollId;
      })[0];
      var pollIndex;
      var optionIndex;

      pollIndex = $scope.polls.indexOf(poll);

      optionIndex = poll.options.indexOf(optionName);
      poll.votes[optionIndex] = poll.votes[optionIndex] + 1;

      $http.put('/api/polls/' + poll._id, poll).
      success(function(newPoll) {
        // replace old poll with new poll to avoid
        // problems with the version number
        $scope.polls[pollIndex].__v = newPoll.__v;
        console.log('success', newPoll);
      }).
      error(function(err) {
        console.log(err);
      });
    };
  });
