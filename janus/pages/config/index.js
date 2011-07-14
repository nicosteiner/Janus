$J.pageConfig = function() {
}

$J.pageConfig.prototype = {

  __loadCSS: false,

  __loadScript: false,

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

      markup: [
      
        '<h1>Headline Test</h1>'
        
      ]
      
    }
    
  },
  
  content: function() {

    return {
  
      phase: 0,
  
      markup: [
      
        '<span>Hello world!</span>' +
        '<p><a href="test.html">Link zu einer zweiten Seite</a></p>'
        
      ]
      
    }
    
  }
  
};
