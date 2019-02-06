angular.module('starter.services', [])

.factory('Goal', function() {
  return goal = {
        id : '',
        date :'',
        name :'',
        description : '',
        rewards : '',
        consequenses : '',
        target : '',
        affirmation : '',
        obstacle : {
            name: '',
            solution: {
              name: '',
              actionSteps: {
                name: '',
                target: '',
                delegate: ''
              } //end action step
            } //end solution
          } //end obstacle
    } // end goal
})

.service('combineGoal', function() {
     this.combineAndSave = function(g){
         //define funciton to combine user inputs with goal already in localstorage
        var rg = localStorage.getItem('newGoal');
            var savedGoal = JSON.parse(rg);
            var combinedGoals = angular.extend(g, savedGoal); 
            
            console.log("G is: " + JSON.stringify(g));
            console.log("SavedGoal is: " + JSON.stringify(savedGoal));
            
             //set goal in local storage
            localStorage.setItem("newGoal", JSON.stringify(g) );
           return JSON.stringify(g);
           
         //******** need to break these apart so that i can make sure that the info is assigned to the proper object property
    }
    
})

.service('storeGoal', function() { 
    this.storeDetails = function(goal){
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
           
            return goal;
            
       } 
    } // end storeDetails
    
    this.storeAffirmation = function(aff){
        var goalAffs = [];
        for(var i = 0; i < aff.length; i++){
            goalAffs[i] = aff[i].text;
        }
        return goalAffs;
        
    }
    
});
