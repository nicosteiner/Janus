if (typeof $J === 'undefined') {

  $J = {};
  
}

// Janus utilities

$J.util = {

  getPageName: function(rawURI) {
  
    var pageWithParams = rawURI.substring(rawURI.lastIndexOf('/'), rawURI.length);
    
    var page = pageWithParams.indexOf('.') ? pageWithParams.substring(1, pageWithParams.indexOf('.')) : '';
    
    if (page === '' || page === '/') {
    
      page = 'index';
    
    }
    
    return page;
  
  },
  
  getSessionId: function() {
  
    return 'g7d6fsaf7as7sa76dsaf7a6ffga';
  
  },
  
  getSession: function(sessionId) {
  
    if (!$J.__session) {
    
      $J.__session = [];
    
    }
    
    if (!$J.__session[sessionId]) {
    
      // create session object
    
      $J.__session[sessionId] = {
      
        data: {
        
          // root element
        
        }
      
      };
      
    }
    
    return $J.__session[sessionId];
    
  },
  
  getAllIncludes: function(element, type) {
  
  
    var allElements = element.getElementsByTagName("*");
    
		var results = [];

		var element;
    
		for (var i = 0; (element = allElements[i]) != null; i++) {
    
			var elementDataAttribute = element.getAttribute('data-inc-type');
      
			if (elementDataAttribute && elementDataAttribute === type) {
      
				results.push(element);
        
      }
        
		}

		return results;
    
  },
  
  getAllModuleIncludes: function() {
  
    var allElements = document.getElementsByTagName("*");
    
		var results = [];

		var element;
    
		for (var i = 0; (element = allElements[i]) != null; i++) {
    
			var elementDataAttribute = element.getAttribute('data-inc-type');
      
			if (elementDataAttribute && elementDataAttribute === 'module') {
      
				results.push(element);
        
      }
        
		}

		return results;
    
  },
  
  // finds the first element with data-inc-id = moduleId
  
  getModuleById: function(moduleId) {
  
    var allElements = document.getElementsByTagName("*");
    
		var result;

		var element;
    
		for (var i = 0; (element = allElements[i]) != null; i++) {
    
			var elementIdAttribute = element.getAttribute('data-inc-id');
      
			if (elementIdAttribute && elementIdAttribute === moduleId) {
      
				return element;
        
      }
        
		}
    
  },
  
  loadStylesheet: function(file) {

    var stylesheetElement = document.createElement('link');
  
    var stylesheetElementReference = document.head.appendChild(stylesheetElement);
    
    stylesheetElementReference.rel = 'stylesheet';
    
    stylesheetElementReference.href = file;

  },
  
  loadScript: function(file, callbackFunction, scope, param) {

    if (typeof document !== 'undefined') {
    
      // we are on the client side
  
      var scriptElement = document.createElement('script');
      
      scriptElement.src = file;

      scriptElement.async = true;
      
      var scriptElementReference = document.head.appendChild(scriptElement);
      
      scriptElementReference.onload = function(scope, callbackFunction, param) {
      
        return function() {
      
          if ($J.pageConfig) {
          
            callbackFunction(scope, param);
          
          }
          
        }
      
      }(scope, callbackFunction, param);
      
    } else {
    
      // we are on the server side
      
      require('../' + file);
    
    }
    
  }
  
};
