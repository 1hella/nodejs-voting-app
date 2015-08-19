'use strict';

angular.module('workspaceApp')
  .controller('DashboardCtrl', function($scope, $http, Auth) {
    $scope.tab = 1; // new poll tab
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.myPolls = [];    
    $scope.poll = {
      author: $scope.getCurrentUser().name,
      name: '',
      options: [{
        name: ''
      }, {
        name: ''
      }]
    };

    $http.get('/api/polls').success(function(myPolls) {
      $scope.myPolls = myPolls;
    });
    
    /* New Poll */
    var clearPoll = function() {
      $scope.poll = {
        author: $scope.getCurrentUser().name,
        name: '',
        options: [{
          name: ''
        }, {
          name: ''
        }]
      };
    };

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
      $scope.poll.options.push({});
    };

    $scope.deleteOption = function(index) {
      $scope.poll.options.splice(index, 1);
    };

    $scope.submitPoll = function() {
      $http.post('/api/polls', $scope.poll).
      then(function(response) {
        $scope.myPolls.push(response.data);
        console.dir($scope.myPolls);
        clearPoll();
        console.dir('Successfully inserted poll');
        $scope.setTab(2);
      }, function error(err) {
        console.dir('error', err);
      });
    };

    /* My Polls */
  });
