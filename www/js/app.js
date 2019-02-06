// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.scrolling.jsScrolling(true);
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive


  // Each tab has its own nav history stack:

  .state('goals', {
        url: '/goals',
        templateUrl: 'templates/goals.html',
        controller: 'AllGoalsController'
  })

  .state('addGoals', {
          url: '/add-goal',
          templateUrl: 'templates/add-goal.html',
          controller: 'AddGoalController'
    })
    
     .state('addGoals.details', {
        url: '/details',
        templateUrl: 'templates/details.html',
        controller: 'AddGoalController'
 })
    
    .state('addGoals.affirmations', {
        url: '/affirmations',
        templateUrl: 'templates/affirmations.html',
        controller: 'AddGoalController'

  })
  
     .state('addGoals.obstacles', {
        url: '/obstacles',
        templateUrl: 'templates/obstacles.html',
        controller: 'AddGoalController'
  })
  .state('addGoals.obstacles.solution', {
        url: '/solutions',
        templateUrl: 'templates/solution.html',
        controller: 'AddGoalController'
  })
  .state('addGoals.obstacles.solution.actionSteps', {
        url: '/action-steps',
        templateUrl: 'templates/action-steps.html',
        controller: 'AddGoalController'
  })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/add-goal');

});
