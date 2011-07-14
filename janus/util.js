if (!window.$J) {

  $J = {};
  
}

// Janus utilities

$J.util = {

  getPageName: function() {
  
    var loc = window.location.href;
    
    var pageWithParams = loc.substring(loc.lastIndexOf('/'), loc.length);
    
    var page = pageWithParams.indexOf('.') ? pageWithParams.substring(1, pageWithParams.indexOf('.')) : '';
    
    if (page === '') {
    
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
    
  }
  
};
