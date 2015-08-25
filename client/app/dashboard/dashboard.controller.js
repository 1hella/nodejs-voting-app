'use strict';

angular.module('workspaceApp')
  .controller('DashboardCtrl', function($scope, $http, Auth) {
    $scope.tab = 1; // new poll tab
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.myPolls = [];
    $scope.poll = {
      author: $scope.getCurrentUser().name,
      name: '',
      options: ['', '']
    };

    // Fetch polls
    getPolls();

    /**
     * retrieve user's polls from API and save them to $scope.myPolls
     */
    function getPolls() {
      $http.get('/api/polls/user/' + $scope.getCurrentUser().name).success(function(myPolls) {
        $scope.myPolls = myPolls;
      });
    }

    /* New Poll */
    function clearPoll() {
      $scope.poll = {
        author: $scope.getCurrentUser().name,
        name: '',
        options: ['', '']
      };
    }

    $scope.setTab = function(tab) {
      $scope.tab = tab;
    };

    $scope.isTab = function(tab) {
      return tab === $scope.tab;
    };

    $scope.getPlaceholder = function(index) {
      switch (index) {
        case 0:
          return 'Pepsi';
        case 1:
          return 'Coca-Cola';
        default:
          return 'New Option';
      }
    };

    $scope.addOption = function() {
      $scope.poll.options.push('');
    };

    $scope.deleteOption = function(index) {
      $scope.poll.options.splice(index, 1);
    };

    $scope.submitPoll = function() {
      $http.post('/api/polls', $scope.poll).
      then(function(response) {
        $scope.myPolls.push(response.data);
        clearPoll();
        $scope.setTab(2);
      });
    };

    /* My Polls */
    $scope.deletePoll = function(poll) {
      $http.delete('/api/polls/' + poll._id).success(function() {
        getPolls();
      });
    };
  });
