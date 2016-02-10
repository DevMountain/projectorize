(function() {
'use strict';

    angular
        .module('projectorize')
        .service('projectParsingService', projectParsingService);

    projectParsingService.$inject = [];
    function projectParsingService() {
        this.parseMarkdownProject = parseMarkdownProject;
        
        ////////////////
        
        /*  "title": "Build something awesome",
            "parts": [{
                "part_title": "Setup Something cool",
                "steps": [*/

        function parseMarkdownProject(repoName, rawMarkdownText) { 
               var project = {
                   title: repoName,
                   parts: getParts(rawMarkdownText)
               }
               return project;
        }
        
        function getParts(rawProject){
            var parts = [];
            var intro = "";
            
            var rows = rawProject.split("\n");
            
            for(var i = 0; i < rows.length; i++){
                var str = rows[i],
                    k = 0;
                while(k < str.length && str[k] === "#") k++;
                
                var lastPart = parts[parts.length - 1];
                
                if(k === 2){
                    parts.push({
                        part_title: str.substring(2),
                        steps:[]
                    })
                } else if(k === 3){
                    var step = {
                        step_title: str.substring(3),
                        substeps: []
                    };
                    lastPart.steps.push(step);
                } else if(k === 4){
                    var substeps = lastPart.steps[lastPart.steps.length - 1].substeps;
                    substeps.push(str.substring(4));
                } else {
                    if(parts.length > 0 && lastPart.steps.length > 0){
                       var substeps = lastPart.steps[lastPart.steps.length - 1].substeps;
                       if(substeps.length === 0 && !str){
                           //Ignore whitespace right after headers
                           continue;
                       }
                        substeps[substeps.length - 1] += "\n" + str;
                    } else {
                        intro = intro.concat("\n",str);
                    }    
                }
                
                
            }
            
            return {
                intro: intro,
                parts: parts
            };
        }
        
        
     }
})();