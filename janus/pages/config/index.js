$J.pageConfig = function() {
}

$J.pageConfig.prototype = {

  __loadCSS: true,

  __loadScript: false,

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
  
      constructor: function(container) {
      
        container.onmouseover = function(container) {
        
          return function() {
        
            container.style.backgroundColor = '#ffff99';
            
          }
        
        }(container);
      
        container.onmouseout = function(container) {
        
          return function() {
        
            container.style.backgroundColor = '';
            
          }
        
        }(container);
      
      },

      destructor: function(container) {
      
      },

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
    
        return  '<div class="tuneup" data-inc-type="module" data-inc-id="outlookExchange"></div>';
        
      }
      
    }
    
  }
  
};
