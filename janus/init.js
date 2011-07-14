// init global Janus object

if (!window.$J) {

  $J = {};
  
}

$J.init = function() {

  this.init();
  
};

$J.init.prototype = {

  initPrivateParams: function() {

    this.__page = $J.util.getPageName();
    
    this.__sessionId = $J.util.getSessionId();
    
    this.__sessionData = $J.util.getSession(this.__sessionId);
    
  },

  loadPageConfig: function() {
  
    if (this.__page) {
    
      var scriptElement = document.createElement('script');
    
      var scriptElementReference = document.body.appendChild(scriptElement);
      
      scriptElementReference.src = 'janus/pages/config/' + this.__page + '.js';
      
      scriptElementReference.onload = function(that) {
      
        return function() {
      
          if ($J.pageConfig) {
          
            that.pageConfigLoaded();
          
          }
          
        }
      
      }(this);
      
    }
  
  },
  
  pageConfigLoaded: function() {
  
    this.__pageConfig = new $J.pageConfig();
  
    if (this.__pageConfig.__loadCSS) {
  
      this.loadPageCSS();
      
    }
  
    if (this.__pageConfig.__loadScript) {
      
      this.loadPageScript();
      
    }
  
    this.renderDocPart('header');
  
    this.renderDocPart('content');
  
  },
  
  loadPageCSS: function() {
  
    if (this.__page) {
    
      var stylesheetElement = document.createElement('link');
    
      var stylesheetElementReference = document.head.appendChild(stylesheetElement);
      
      stylesheetElementReference.rel = 'stylesheet';
      
      stylesheetElementReference.href = 'janus/pages/style/' + this.__page + '.css';

    }
  
  },
  
  loadPageScript: function() {
  
    if (this.__page) {
    
      var scriptElement = document.createElement('script');
    
      var scriptElementReference = document.head.appendChild(scriptElement);
      
      scriptElementReference.src = 'janus/pages/script/' + this.__page + '.js';

    }
  
  },
  
  renderDocPart: function(part) {

    if (typeof this.__pageConfig[part] == "function") {
    
      // http://stackoverflow.com/questions/912596/how-to-turn-a-string-into-a-javascript-function-call
    
      var docPartConfig = this.__pageConfig[part]();
        
      var containerElement = document.getElementById(part);
    
      if (containerElement) {
    
        containerElement.innerHTML = docPartConfig.markup;
        
        // if there is a constructor, call it
        
        if (docPartConfig.constructor) {
        
          docPartConfig.constructor(containerElement);
          
        }

      }
      
    }
  
  },
  
  init: function() {

    this.initPrivateParams();
    
    this.loadPageConfig();
  
  }

};

// here we go!

new $J.init();