$J.pageConfig = function() {
}

$J.pageConfig.prototype = {

  __loadCSS: true,

  __loadScript: false,

  header: function() {

    return {
  
      phase: 0,
  
      markup: [
      
        '<h1>Das ist eine zweite Seite</h1>'
        
      ]
      
    }
    
  },
  
  content: function() {

    return {
  
      phase: 0,
  
      markup: [
      
        '<p><a href="index.html">Hier geht es wieder zurück</a></p>'
        
      ]
      
    }
    
  }
  
};
