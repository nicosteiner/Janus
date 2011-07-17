// init global Janus object

if (typeof $J === 'undefined') {

  $J = {};
  
}

if (!$J.moduleConfig) {

  $J.moduleConfig = {};

}

$J.init = function() {

  this.init();
  
};

$J.init.prototype = {

  __initPrivateParams: function() {

    this.__page = $J.util.getPageName($J.initParams.url);
    
    this.__sessionId = $J.util.getSessionId();
    
    this.__sessionData = $J.util.getSession(this.__sessionId).data;
    
  },

  __loadPageConfig: function() {
  
    if (this.__page) {
    
      $J.util.loadScript('janus/pages/config/' + this.__page + '.js', this.__pageConfigLoaded, this);

    }
      
  },
  
  __pageConfigLoaded: function(scope, param) {
  
    // no param
  
    scope.__pageConfig = new $J.pageConfig();
  
    if (scope.__pageConfig.head) {
  
      scope.__renderPageHead();
      
    }
  
    if (scope.__pageConfig.body) {
  
      scope.__renderPageBody();
      
    }
  
    if (scope.__pageConfig.__loadCSS) {
  
      scope.__loadPageCSS();
      
    }
  
    if (scope.__pageConfig.__loadScript) {
      
      scope.__loadPageScript();
      
    } else {
  
      scope.__renderPageIncludes();
      
      scope.__renderPageModules();
      
    }
    
  },
  
  renderModule: function(moduleId) {
  
    var moduleConfig = $J.moduleConfig[moduleId];
    
    if (!moduleConfig) {
    
      this.__loadModuleConfig(moduleId);
    
    } else {
    
      this.__renderModule(moduleId, new moduleConfig);
    
    }
  
  },
  
  __loadModuleConfig: function(moduleId) {
  
    $J.util.loadScript('janus/modules/config/' + moduleId + '.js', this.__moduleConfigLoaded, this, moduleId);

  },
  
  __moduleConfigLoaded: function(scope, param) {
  
    // param = moduleId
  
    var moduleConfig = $J.moduleConfig[param];

    if (typeof moduleConfig === 'function') {
        
      if (moduleConfig.__loadCSS) {
    
      }
    
      if (moduleConfig.__loadScript) {
        
      }
      
      scope.__renderModule(param, new moduleConfig);
      
    }
  
  },
  
  __renderModule: function(moduleId, moduleConfig) {
  
    var moduleElement = $J.util.getModuleById(moduleId);
  
    if (moduleConfig.root) {
  
      this.__renderDocPart(moduleConfig, moduleElement, 'root', -1);
      
    }
  
    this.__renderModuleParts(moduleConfig, moduleElement);
    
  },
  
  __renderModuleParts: function(moduleConfig, moduleElement) {
  
    // there are 6 render phases
  
    for (var phase = 0; phase < 6; phase++) {
        
      var allModuleParts = $J.util.getAllIncludes(moduleElement, 'module-part');

      for (var i = 0; i < allModuleParts.length; i++) {

        var modulePart = allModuleParts[i];
      
        if (modulePart) {

          this.__renderDocPart(moduleConfig, modulePart, modulePart.getAttribute('data-inc-id'), phase);
          
        }
        
      }
      
    }
  
  },
  
  __renderPageHead: function() {
  
    var containerElement = document.head;

    this.__renderDocPart(this.__pageConfig, containerElement, 'head', -1);
  
  },
  
  __renderPageBody: function() {
  
    var containerElement = document.body;

    this.__renderDocPart(this.__pageConfig, containerElement, 'body', -1);
  
  },
  
  __loadPageCSS: function() {
  
    if (this.__page) {

      $J.util.loadStylesheet('janus/pages/style/' + this.__page + '.css');
    
    }
  
  },
  
  __loadPageScript: function() {
  
    if (this.__page) {
    
      $J.util.loadScript('janus/pages/script/' + this.__page + '.js', this.__pageScriptLoaded, this);

    }
      
  },
  
  __pageScriptLoaded: function(scope, param) {

    // no param
  
    scope.__renderPageIncludes();
    
    scope.__renderPageModules();
    
  },
  
  __renderPageIncludes: function() {
  
    // there are 6 render phases

    for (var phase = 0; phase < 6; phase++) {
        
      var allPageIncludes = $J.util.getAllIncludes(document.body, 'page');
    
      for (var i = 0; i < allPageIncludes.length; i++) {

        var pageInclude = allPageIncludes[i];
      
        if (pageInclude) {
      
          this.__renderDocPart(this.__pageConfig, pageInclude, pageInclude.getAttribute('data-inc-id'), phase);
            
        }
        
      }
      
    }
  
  },
    
  __renderPageModules: function() {
  
    var allModuleIncludes = $J.util.getAllIncludes(document.body, 'module');
  
    for (var i = 0; i < allModuleIncludes.length; i++) {

      var moduleInclude = allModuleIncludes[i];
    
      if (moduleInclude) {
    
        this.__loadModuleConfig(moduleInclude.getAttribute('data-inc-id'));
  
      }
      
    }
  
  },
  
  __renderDocPart: function(config, containerElement, part, phase) {

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

    this.__initPrivateParams();
    
    this.__loadPageConfig();
  
  }

};

// here we go!

$J.app = new $J.init();