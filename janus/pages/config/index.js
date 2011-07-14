$J.pageConfig = function() {
}

$J.pageConfig.prototype = {

  __loadCSS: true,

  __loadScript: true,

  root: function() {
  
  },
  
  head: function() {
  
    return {
    
      markup: function() {
    
        return '<title>Janus - Create something new</title>';
      
      }
    
    }
  
  },
  
  body: function() {
  
    return {
    
      markup: function() {
    
        return  '<div id="header" data-inc-type="page" data-inc-id="header"></div>' +
                '<div id="content" data-inc-type="page" data-inc-id="content"></div>' +
                '<div id="footer" data-inc-type="page" data-inc-id="footer"></div>';
      
      }
    
    }
  
  },
  
  header: function() {

    return {
  
      phase: 0,
  
      markup: function() {
    
        return  '<h1>Test-Applikation</h1>' +
                '<p><a href="test.html">Link zu einer zweiten Seite</a></p>';
        
      }
      
    }
    
  },
  
  content: function() {

    return {
  
      phase: 0,
  
      markup: function() {
    
        return  '<div class="tuneup cart" data-inc-type="module" data-inc-id="cart"></div>' +
                '<div class="tuneup" data-inc-type="module" data-inc-id="outlookExchange"></div>' +
                '<div class="tuneup" data-inc-type="module" data-inc-id="promotion"></div>';
        
      }
      
    }
    
  }
  
};
