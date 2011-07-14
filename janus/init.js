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
  
    if (this.__pageConfig.head) {
  
      this.renderPageHead();
      
    }
  
    if (this.__pageConfig.body) {
  
      this.renderPageBody();
      
    }
  
    if (this.__pageConfig.__loadCSS) {
  
      this.loadPageCSS();
      
    }
  
    if (this.__pageConfig.__loadScript) {
      
      this.loadPageScript();
      
    }
  
    this.renderPageIncludes();
    
    this.renderPageModules();
    
  },
  
  loadModuleConfig: function(moduleElement) {
  
    var scriptElement = document.createElement('script');
  
    var scriptElementReference = document.body.appendChild(scriptElement);
    
    scriptElementReference.src = 'janus/modules/config/' + moduleElement.getAttribute('data-inc-id') + '.js';
    
    scriptElementReference.onload = function(that, moduleElement) {
    
      return function() {
    
        // this must be refactored
    
        if ($J.moduleConfig) {
        
          that.moduleConfigLoaded(new $J.moduleConfig, moduleElement);
        
        }
        
      }
    
    }(this, moduleElement);
    
  },
  
  moduleConfigLoaded: function(moduleConfig, moduleElement) {
  
    if (moduleConfig.__loadCSS) {
  
    }
  
    if (moduleConfig.__loadScript) {
      
    }
  
    if (moduleConfig.root) {
  
      this.renderDocPart(moduleConfig, moduleElement, 'root', -1);
      
    }
  
    this.renderModuleParts(moduleConfig, moduleElement);
    
  },
  
  renderModuleParts: function(moduleConfig, moduleElement) {
  
    // there are 6 render phases
  
    for (var phase = 0; phase < 6; phase++) {
        
      var allModuleParts = $J.util.getAllIncludes(moduleElement, 'module-part');

      for (var i = 0; i < allModuleParts.length; i++) {

        var modulePart = allModuleParts[i];
      
        if (modulePart) {

          this.renderDocPart(moduleConfig, modulePart, modulePart.getAttribute('data-inc-id'), phase);
          
        }
        
      }
      
    }
  
  },
  
  renderPageHead: function() {
  
    var containerElement = document.head;

    this.renderDocPart(this.__pageConfig, containerElement, 'head', -1);
  
  },
  
  renderPageBody: function() {
  
    var containerElement = document.body;

    this.renderDocPart(this.__pageConfig, containerElement, 'body', -1);
  
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
  
  renderPageIncludes: function() {
  
    // there are 6 render phases

    for (var phase = 0; phase < 6; phase++) {
        
      var allPageIncludes = $J.util.getAllIncludes(document.body, 'page');
    
      for (var i = 0; i < allPageIncludes.length; i++) {

        var pageInclude = allPageIncludes[i];
      
        if (pageInclude) {
      
          this.renderDocPart(this.__pageConfig, pageInclude, pageInclude.getAttribute('data-inc-id'), phase);
            
        }
        
      }
      
    }
  
  },
    
  renderPageModules: function() {
  
    var allModuleIncludes = $J.util.getAllIncludes(document.body, 'module');
  
    for (var i = 0; i < allModuleIncludes.length; i++) {

      var moduleInclude = allModuleIncludes[i];
    
      if (moduleInclude) {
    
        this.loadModuleConfig(moduleInclude, moduleInclude.getAttribute('data-inc-id'));
  
      }
      
    }
  
  },
  
  renderPageModule: function(pageModule, part) {
  
  },
    
  renderDocPart: function(config, containerElement, part, phase) {

    if (typeof config[part] === 'function') {
    
      // http://stackoverflow.com/questions/912596/how-to-turn-a-string-into-a-javascript-function-call
    
      var docPartConfig = config[part]();
        
      if (containerElement && (phase === -1 || docPartConfig.phase === phase)) {

        // if there is content from previous rendering,
        // try to call destructor
      
        if (containerElement.innerHTML !== '') {
        
          if (typeof docPartConfig.destructor === 'function') {
          
            docPartConfig.destructor(containerElement);
            
          }
          
        }
    
        // replace container element with new markup
    
        containerElement.innerHTML = docPartConfig.markup();
        
        // if there is a constructor, call it
        // check is a hack, because first check is always true and typeof always equals "function"
        
        if (docPartConfig.constructor && docPartConfig.constructor.name === '') {
        
          docPartConfig.constructor(containerElement);
          
        }
        
        return true;

      }
      
    }
    
    return false;
  
  },
  
  init: function() {

    this.initPrivateParams();
    
    this.loadPageConfig();
  
  }

};

// here we go!

new $J.init();