<<<<<<< HEAD
angular.module('projectorize').service('projectService', function(){
    
})
=======
angular.module('projectorize').service('projectService', function($http, $q, $timeout, projectParsingService){
    
    this.getProject = function(projectName) {
        return $http({
            method: 'GET',
            url: '/api/project/{0}'.format(projectName),
        }).then(function(response){
            if(response.status === 200){
               return projectParsingService.parseMarkdownProject(projectName, response.data);
            }
            throw new Error("Could not find or parse a project with that name")
        })
    }
})

>>>>>>> done
