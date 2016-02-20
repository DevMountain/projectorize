angular.module('projectorize').directive('step', function(){
    return {
        scope: {
            data: '=',
            stepNum: '&'
        },
        templateUrl: '/js/directives/step-tmpl.html',
        controller: function($scope){
            $scope.currentIndex = 0;
            $scope.currentInstructions = getCurrentInstructions();
            $scope.currentPrompt = "More"
            var totalSteps = $scope.data.substeps.length
            $scope.hasMultipleSteps = totalSteps > 1;
            
            var maxIndex = totalSteps - 1;
            
            
            
            $scope.toggleVerbosity = function(){
                //Ternary Operator
                $scope.currentIndex = $scope.currentIndex === maxIndex ? 0 : $scope.currentIndex + 1;
                
                $scope.currentInstructions = getCurrentInstructions();;
            
                $scope.currentPrompt = $scope.currentIndex === maxIndex ? "Less" : "More"
                        
            }
            
            function getCurrentInstructions(){
               var instr = "";
               for(var i = 0; i <= $scope.currentIndex; i++){
                  instr = instr.concat('\n', $scope.data.substeps[i]);  
               } 
               return instr;
            }
        }      
    }
})
