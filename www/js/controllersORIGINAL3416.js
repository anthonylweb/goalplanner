angular.module('starter.controllers', [])

.controller('AddGoalController', ['$scope', '$ionicSideMenuDelegate', 'Goal' ,function($scope, $ionicSideMenuDelegate, Goal ) {
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
    
    
    $scope.saveGoal = function(goal){
        
        //define funciton to combine user inputs with goal already in localstorage
        function combineAndSave(g){
            var rg = localStorage.getItem('newGoal');
            var savedGoal = JSON.parse(rg);
            var combinedGoals = angular.extend(g, savedGoal); 
            
            console.log("G is: " + JSON.stringify(g));
            console.log("SavedGoal is: " + JSON.stringify(savedGoal));
            
             //set goal in local storage
            localStorage.setItem("newGoal", JSON.stringify(g) );
            // var retrievedGoal = localStorage.getItem('newGoal');
        }
        
        //Test to see if there is a goal already in local storage
        if(!localStorage.getItem('newGoal')){
            //if goal is not set in storage
            
            //Set Goal ID
            goal.id = Math.floor(Date.now() / 1000);
            //set goal.today value
            if (!Date.now) {
                Date.now = function() { return new Date().getTime(); }
            }
            if(!goal.today){
                //set the goal date
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1; //January is 0!
                var yyyy = today.getFullYear();
                if(dd<10) {
                    dd='0'+dd
                } 
                if(mm<10) {
                    mm='0'+mm
                } 
                goal.today = mm+'/'+dd+'/'+yyyy;
            } //end setting goal.today
            
        } 
         
         if(typeof goal.obstacle){
            //test if we are trying to set an obstacle
            //if not, define nGoal.obstacle
                
               // nGoal[ nGoal.length]['obstacle'][nGoal['obstacle'].length]['name'] = goal.obstacle;
                
                if(typeof goal.solution){
                  // nGoal.obstacle[goal.assocGoal].solution.name = goal.solution;
                }
                
                if(typeof goal.actionStep_name){
                    
                }
                
                //add inputs to goal in localstorage
              //  combineAndSave(nGoal);
        } // end obstacle test 
        
        
        combineAndSave(goal);
       // console.log(goal);
  
        
        //var retrievedGoal = localStorage.getItem('newGoal');

    } // end saveGoal
 
}])
.directive('affirmation', function($compile){
return{
	templateUrl: 'templates/dir-templates/affirmations.html',
    restrict: 'E',
     scope: {goal: '='},
    link: function (scope, elm) {
        scope.addAffirmation = function(){
           elm.after($compile('<affirmation goal="goal"></affirmation>')(scope));
        }
    },
	controller: 'AddGoalController'
	
};
})

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
     scope: {goal: '='},
	controller: 'AddGoalController'
	
};
})

.directive('actionStep', function($compile){
return{
	template: '<div class="action-steps card"><h3 class="sect-head">Action Steps</h3><label class="item item-input item-floating-label"><span class="input-label">Step: </span><input type="text" ng-model="goal.actionStep_name" class="obst1-as" placeholder="One step I will do to complete this goal..."  / ></label><label class="item item-input item-floating-label"><span class="input-label">Target Date:</span><input type="date" ng-model="goal.actionStep_targetDate"  placeholder="My Target Date for completion is..."/></label><label class="item item-input item-floating-label"><span class="input-label">Delegate: </span><input type="text" ng-model="goal.obstacles_solution_actionStep_delegate" placeholder="Who can I delegate this step to..."  / ></label></div>',
    restrict: 'E',
     scope: {goal: '='},
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
    scope: {goal: '='},
    link: function (scope, elm) {
        scope.addSolution = function(){
           elm.after($compile('<solution></solution>')(scope));
        }
    },
	controller: 'AddGoalController'
	
};
})


.controller('AllGoalsController', function($scope) {

});