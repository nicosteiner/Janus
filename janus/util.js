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
    
  }
  
};
