'use strict';

angular.module('workspaceApp')
  .controller('PollCtrl', function($scope, $stateParams, $http, $state, Auth) {
    var pollId = $stateParams.id;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.poll = {};
    $http.get('/api/polls/' + pollId).success(function(poll) {
      $scope.poll = poll;
    }).error(function(err) {
      console.log(err);
      // redirect home
      $state.go('main');
    });

    /*
     * Add an option to the poll
     */
    $scope.addOption = function(poll, option) {
      if (!$scope.isLoggedIn()) {
        $state.go('login');
        return;
      }

      if ($scope.poll.options.indexOf(option) !== -1) {
        // option already exists
        toastr.clear();
        toastr.error('Sorry, that option already exists!');
        return;
      }

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

      if (!$scope.isLoggedIn()) {
        $state.go('login');
        return;
      }

      var optionName = chartElement[0].label;
      var optionIndex = $scope.poll.options.indexOf(optionName);
      toastr.clear();

      $http.post('/api/polls/' + $scope.poll._id + '/' + optionIndex)
        .then(
          function(response) {
            toastr.success('Thank you for your input!', '', {
              closeButton: true
            });
            // update changed data
            $scope.poll.__v = response.data.__v;
            $scope.poll.votes[optionIndex] = response.data.votes[optionIndex];
            $scope.poll.users_voted = response.data.users_voted;
          },
          function(error) {
            if (error.status === 403) {
              toastr.warning('You have already voted on this poll!', '', {
                closeButton: true
              });
            } else {
              toastr.error('An error occured!', error.status, {
                closeButton: true
              });
            }
          });
    };
  });
