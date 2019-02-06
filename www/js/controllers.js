angular.module('starter.controllers', [])

.controller('AddGoalController', ['$scope', '$ionicSideMenuDelegate', 'Goal' , 'storeGoal', 'combineGoal', function($scope, $ionicSideMenuDelegate, Goal, storeGoal, combineGoal ) {
    $scope.toggleLeft = function() { 
        $ionicSideMenuDelegate.toggleLeft();
    };
    
    $scope.closeMenu = function(){
        $ionicSideMenuDelegate.toggleLeft();
    }
    

    
     if( localStorage.getItem('newGoal') ){
         //if there is a stored goal
         var rg = localStorage.getItem('newGoal');
         $scope.goal = JSON.parse(rg);
         
     } else {
         $scope.goal = Goal;
     }  
     
     $scope.clearLS = function(){
         delete localStorage.newGoal;
     }
     
     $scope.saveDetails = function(goal) {
        var saveDets = storeGoal.storeDetails(goal);
        var combinedGoal = combineGoal.combineAndSave(saveDets);
        console.log(combinedGoal);
     }
     
     $scope.affirmations = [{id: 'aff1'}];
     
     $scope.showAddAff = function(affirmation) {
        return affirmation.id === $scope.affirmations[$scope.affirmations.length-1].id;
        };

     
     $scope.addAffirmation = function() {
        var newItemNo = $scope.affirmations.length+1;
        $scope.affirmations.push({'id':'affirmation'+newItemNo});
        };
     
     $scope.saveAffirmations = function(aff){
         var allAffirmations = storeGoal.storeAffirmation(aff);
         var combinedGoal = combineGoal.combineAndSave(allAffirmations);
        console.log(combinedGoal);
     }
    
    
    
    
 
}])

.directive('sideMenu', function($compile){
return{
	templateUrl: 'templates/dir-templates/sidemenu.html',
    restrict: 'E',
    transclude: true,
	controller: 'AddGoalController',
    link: function (scope, elm) {
        scope.sideMenuClick = function(goal){
            scope.closeMenu();
    } //end sideMenuClick
    },
	
};
})

.directive('saveButton', function($compile){
return{
	template: '<button class="button button-full button-royal" ng-click="saveGoal(goal)"><i class="icon ion-android-upload icon-positive" ></i> Save</button> <button class="button button-full button-assertive" ng-click="clearLS()"> Clear LS </button> ',
    restrict: 'E',
	controller: 'AddGoalController'
	
};
})

.directive('actionStep', function($compile){
return{
	template: '<div class="action-steps card"><h3 class="sect-head">Action Steps</h3><label class="item item-input item-floating-label"><span class="input-label">Step: </span><input type="text" ng-model="goal.actionStep_name" class="obst1-as" placeholder="One step I will do to complete this goal..."  / ></label><label class="item item-input item-floating-label"><span class="input-label">Target Date:</span><input type="date" ng-model="goal.actionStep_targetDate"  placeholder="My Target Date for completion is..."/></label><label class="item item-input item-floating-label"><span class="input-label">Delegate: </span><input type="text" ng-model="goal.obstacles_solution_actionStep_delegate" placeholder="Who can I delegate this step to..."  / ></label></div>',
    restrict: 'E',
    link: function (scope, elm) {
        scope.addActionStep = function(){
           elm.after($compile('<action-step></action-step>')(scope));
        }
    },
	controller: 'AddGoalController'
	
};
})

.directive('solution', function($compile){
return{
	templateUrl: 'templates/dir-templates/solution.html',
    restrict: 'E',
    link: function (scope, elm) {
        scope.addSolution = function(){
           elm.after($compile('<solution></solution>')(scope));
        }
    },
	controller: 'AddGoalController'
	
};
})


.controller('AllGoalsController', '$ionicSideMenuDelegate', function($scope, $ionicSideMenuDelegate) {
     $scope.toggleLeft = function() { 
        $ionicSideMenuDelegate.toggleLeft();
    };
    
    $scope.closeMenu = function(){
        $ionicSideMenuDelegate.toggleLeft();
    }
});