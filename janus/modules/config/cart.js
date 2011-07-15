$J.moduleConfig.cart = function() {
}

$J.moduleConfig.cart.prototype = {

  __loadCSS: false,

  __loadScript: false,

  root: function() {
  
    return {
  
      markup: function() {
      
        return  '<div class="header" data-inc-type="module-part" data-inc-id="header"></div>' +
                '<div class="content" data-inc-type="module-part" data-inc-id="content"></div>' +
                '<div class="footer" data-inc-type="module-part" data-inc-id="footer"></div>';
      
      }
    
    };

  },
  
  header: function() {
  
    return {
  
      phase: 0,
      
      markup: function() {
      
        return '<h2>Warenkorb</h2>';
      
      }
      
    }

  },
  
  content: function() {

    return {
  
      phase: 0,
      
      markup: function() {
      
        var markup = '<em>Folgende Dinge befinden sich in Ihrem Warenkorb:</em>';
        
        markup += '<ul>';
      
        if ($J.cart.articleInCart()) {
      
          var cartInfo = $J.cart.getCartInfo();
        
          for (article in cartInfo.articles) {
          
            if (cartInfo.articles[article].amount > 0) {
          
              markup = markup + '<li>' + cartInfo.articles[article].amount + 'x ' + cartInfo.articles[article].name + ' <a href="#" class="remove" data-article-id="' + article + '">x</a></li>';
              
            }
            
          }
          
        } else {
        
          markup += '<li>keine Artikel im Warenkorb</li>';
        
        }
        
        markup += '</ul>';
        
        return markup;
      
      },
      
      constructor: function(container) {
      
        var allRemoveButtons = container.getElementsByClassName('remove');
      
        if (allRemoveButtons) {
        
          for (var i = 0; i < allRemoveButtons.length; i++) {
      
            allRemoveButtons[i].addEventListener('click', function(articleId) {
            
              return function(e) {
            
                $J.cart.removeArticle(articleId);
              
                $J.app.renderModule('cart');
                
                e.preventDefault();
                
              }
            
            }(allRemoveButtons[i].getAttribute('data-article-id')), false);
            
          }
          
        }
        
      },
      
      destructor: function(container) {
      
        var allRemoveButtons = container.getElementsByClassName('remove');
      
        if (allRemoveButtons) {
        
          for (var i = 0; i < allRemoveButtons.length; i++) {
      
            allRemoveButtons[i].removeEventListener('click');
            
          }
          
        }
        
      }
      
    };

  },
  
  footer: function() {

    return {
  
      phase: 0,
      
      markup: function() {
      
        return  '<a href="#" data-inc-type="module-part" data-inc-id="order" class="bt_def_small"></a>';
      
      }
      
    };

  },
  
  order: function() {

    return {
  
      phase: 1,
      
      constructor: function(container) {
      
        container.addEventListener('click', function(container) {
        
          return function(e) {
        
            alert("checkout!");
            
            e.preventDefault();
            
          }
        
        }(container), false);
        
      },
      
      destructor: function(container) {
      
        container.removeEventListener('click');
        
      },
      
      markup: function() {
      
        return  'Jetzt bestellen!';
      
      }

    }

  }
  
};
