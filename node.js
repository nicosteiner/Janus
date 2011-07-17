var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
  
  var __req = request.url;

  var __requestSplit = __req.split('.');
  
  var __ressourceType = __requestSplit[__requestSplit.length - 1];
  
  if (__ressourceType === 'js') {
  
    fs.readFile('.' + __req, function(error, content) {
      
      if (!error) {
      
        response.writeHead(200, {'Content-Type': 'text/javascript'});
    
        response.end(content);
        
      }
      
    });
    
  } else if  (__ressourceType === 'css') {

    fs.readFile('.' + __req, function(error, content) {
      
      if (!error) {
      
        response.writeHead(200, {'Content-Type': 'text/css'});
    
        response.end(content);
        
      }
      
    });
    
  } else {
  
    require('./janus/init-params-server.js');

    $J.initParams.url = __req;
  
    require('./janus/util.js');
    require('./janus/init.js');

    response.writeHead(200, {'Content-Type': 'text/html'});
    
    __pageConfig = new $J.pageConfig();
  
    if (__pageConfig.root) {

      var __rootConfig = __pageConfig.root();
    
      var markup = __rootConfig.markup();
      
      response.end(markup);
      
    }
  
  }
  
  
}).listen(8084);

console.log('Server running at http://127.0.0.1:8084/');