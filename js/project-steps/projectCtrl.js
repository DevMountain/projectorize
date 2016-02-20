angular.module('projectorize').controller('projectCtrl', function($scope, projectService, $location){
    $scope.isLoading = true;
    $scope.lastTitle = $scope.title;
    
    var path = $location.path();
    
    $scope.getProject = function(projectName){
        projectService.getProject(projectName).then(function(data){
            $scope.isLoading = false;
            
            $scope.project = data;  
            $scope.currentPart = $scope.project.parts.parts[0];
        }, function (err){
            console.log(err);
        })
    }
    
    $scope.titleChanged = function(){
        if($scope.project.title !== $scope.lastTitle){
            $scope.lastTitle = $scope.project.title;
            $scope.getProject($scope.lastTitle);
        }
    }
    
    $scope.setCurrentPart = function(part) {
        $scope.currentPart = part;
    }
    
        
    if(path){
        path = path.substring(1);
        $scope.getProject(path);
    }
})