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
     * Add an option to a poll.
     * Checks to see if the option already exists
     */
    $scope.addOption = function(poll, option) {
      if (!$scope.isLoggedIn()) {
        $state.go('login');
        return;
      }

      var pollIndex = $scope.polls.indexOf(poll);

      if ($scope.polls[pollIndex].options.indexOf(option) !== -1) {
        // option already exists
        toastr.clear();
        toastr.error('Sorry, that option already exists!');
        return;
      }
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
      toastr.clear();

      $http.post('/api/polls/' + pollId + '/' + optionIndex)
        .then(
          function(response) {
            toastr.success('Thank you for your input!', '', {
              closeButton: true
            });
            // update changed data
            $scope.polls[pollIndex].__v = response.data.__v;
            $scope.polls[pollIndex].votes[optionIndex] = response.data.votes[optionIndex];
            $scope.polls[pollIndex].users_voted = response.data.users_voted;
          },
          function(error) {
            if (error.status === 403) {
              toastr.warning('You have already voted on this poll!', '', {
                closeButton: true
              });
            } else {
              toastr.error('An error occured!', error.status, {closeButton: true});
            }
          });
    };
  });
