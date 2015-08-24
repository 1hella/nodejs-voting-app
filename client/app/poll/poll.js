'use strict';

angular.module('workspaceApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('poll', {
        url: '/poll',
        templateUrl: 'app/poll/poll.html',
        controller: 'PollCtrl'
      });
  });