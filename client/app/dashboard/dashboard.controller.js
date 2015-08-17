'use strict';

angular.module('workspaceApp')
  .controller('DashboardCtrl', function($scope) {
    $scope.tab = 1; // new poll tab
    $scope.poll = {
      name: '',
      options: [{
        name: ""
      }, {
        name: ""
      }]
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
  });
