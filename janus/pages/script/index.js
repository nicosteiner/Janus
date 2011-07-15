$J.cartImpl = function() {
  
  this.init();

}

$J.cartImpl.prototype = {

  setArticle: function(articleId, articleName, articleAmount) {
  
    if ($J.app.__sessionData.cart.articles[articleId]) {
    
      // yes: article exists
    
      return false;

    } else {
    
      // no: set article
    
      $J.app.__sessionData.cart.articles[articleId] = {};
      
      $J.app.__sessionData.cart.articles[articleId].name = articleName;
      
      $J.app.__sessionData.cart.articles[articleId].amount = articleAmount;
      
      return true;
    
    }
  
  },

  addArticle: function(articleId) {
  
    // check if article exists
    
    if ($J.app.__sessionData.cart.articles[articleId]) {
    
      // yes: raise amount by 1
    
      var raised = this.setArticleAmount(articleId, $J.app.__sessionData.cart.articles[articleId].amount + 1);
      
      return raised;
    
    } else {
    
      // no: article does not exists
    
      return false;
    
    }
  
  },
  
  setArticleAmount: function(articleId, articleAmount) {
  
    if ($J.app.__sessionData.cart.articles[articleId]) {
    
      // yes: set amount
    
      $J.app.__sessionData.cart.articles[articleId].amount = articleAmount;
      
      return true;
    
    } else {
    
      // no: article does not exists
    
      return false;
    
    }
  
  },

  removeArticle: function(articleId) {
  
    // check if article exists
    
    if ($J.app.__sessionData.cart.articles[articleId]) {
    
      // yes: set article amount to 0
    
      $J.app.__sessionData.cart.articles[articleId].amount = 0;
      
      return true;
    
    } else {
    
      // no: article does not exists
    
      return false;
      
    }
  
  },
  
  getCartInfo: function() {
  
    return $J.app.__sessionData.cart;
  
  },

  articleInCart: function() {
  
    var cartInfo = this.getCartInfo();
    
    if (cartInfo.articles) {
  
      for (article in cartInfo.articles) {
      
        if (cartInfo.articles[article].amount > 0) {
    
          return true;
          
        }
        
      }
      
    }
    
    return false;
    
  },

  init: function() {

    if ($J.app.__sessionData) {
    
      $J.app.__sessionData.cart = {};
    
      $J.app.__sessionData.cart.articles = {};
    
      $J.app.__sessionData.cart.costs = {};
    
    }
    
  }

};

$J.cart = new $J.cartImpl();