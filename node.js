var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
  
  var markup =  '<!DOCTYPE html>' +
                '<html>' +
                '<head></head>' +
                '<body>' +
                '<script src="janus/util.js"></script>' +
                '<script src="janus/init.js"></script>' +
                '</body>' +
                '</html>';
  
  var req = request.url.substring(1);
  
  var requestSplit = req.split('.');
  
  var ressourceType = requestSplit[requestSplit.length - 1];
  
  if (ressourceType === 'js') {
  
    fs.readFile(req, function(error, content) {
      
      if (!error) {
      
        response.writeHead(200, {'Content-Type': 'text/javascript'});
    
        response.end(content);
        
      }
      
    });
    
  } else if  (ressourceType === 'css') {

    fs.readFile(req, function(error, content) {
      
      if (!error) {
      
        response.writeHead(200, {'Content-Type': 'text/css'});
    
        response.end(content);
        
      }
      
    });
    
  } else {
  
    response.writeHead(200, {'Content-Type': 'text/html'});
    
    response.end(markup);
  
  }
  
  
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');