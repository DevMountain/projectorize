var express = require('express');
var keys = require('./keys');
var GitHubApi = require("github");
var data = require('./dataSample2')

var github = new GitHubApi({
     // required
    version: "3.0.0",
    // optional
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    timeout: 5000,
    headers: {
        "Accept": "application/vnd.github.V3.raw"
    }
})

github.authenticate({
    type: "oauth",
    key: keys.GITHUB_CLIENT_ID,
    secret: keys.GITHUB_CLIENT_SECRET
})

var app = express();
app.use(express.static(__dirname));

app.get('/api/project/:projectId', function(req, res){
    
    res.send(data);
	// github.repos.getReadme({
    //     user: "Devmountain",
    //     repo: req.params.projectId
    // }, (err, response) => {
    //     if(!err){
    //         res.send(response);
    //     }  else {
    //         res.status(500).send("Error retrieving readme from project. Please double check your spelling." + err);
    //     }
    // })
})

app.listen('3001', function(){
	
})