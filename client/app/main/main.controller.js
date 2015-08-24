'use strict';

angular.module('workspaceApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.labels = ['Pepsi', 'Coca-Cola'];
    $scope.data = [1, 10];
    $scope.polls = [{
      options: ['label1', 'label2'],
      votes: [0, 1]
    }];
    
    $http.get('/api/polls').then(function(polls) {
      $scope.polls = polls.data;
      console.dir(polls);
    }, function error(err) {
      console.log(err);
    });

    // $scope.awesomeThings = [];

    // $http.get('/api/things').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    // });

    // $scope.addThing = function() {
    //   if($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', { name: $scope.newThing });
    //   $scope.newThing = '';
    // };

    // $scope.deleteThing = function(thing) {
    //   $http.delete('/api/things/' + thing._id);
    // };
  });
