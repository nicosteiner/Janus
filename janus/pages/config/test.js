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
    
        return  '<meta charset="utf-8">' +
                '<title>Janus - Seite Test - Create something new</title>';
      
      }
    
    };
  
  },
  
  body: function() {
  
    return {
    
      markup: function() {
    
        return  '<div data-inc-type="page" data-inc-id="header"></div>' +
                '<div data-inc-type="page" data-inc-id="content"></div>' +
                '<div data-inc-type="page" data-inc-id="footer"></div>';
      
      }
    
    };
  
  },
  
  header: function() {

    return {
  
      phase: 0,
  
      markup: function() {
    
        return '<h1>Das ist eine zweite Seite</h1>';
        
      }
      
    }
    
  },
  
  content: function() {

    return {
  
      phase: 0,
  
      markup: function() {
    
        return '<p><a href="index.html">Hier geht es wieder zurück</a></p>';
        
      }
      
    };
    
  }
  
};
