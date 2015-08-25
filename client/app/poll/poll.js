'use strict';

angular.module('workspaceApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('poll', {
        url: '/poll/:id',
        templateUrl: 'app/poll/poll.html',
        controller: 'PollCtrl'
      });
  });