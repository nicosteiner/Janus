$J.moduleConfig.promotion = function() {
}

$J.moduleConfig.promotion.prototype = {

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
      
        return '<h2>Hosting: Mehr Besucher</h2>';
      
      }
      
    }

  },
  
  content: function() {

    return {
  
      phase: 0,
      
      markup: function() {
      
        return  '<h3>Werbe-Paket</h3>' +
                '<em>Suchmaschinen-Experten werben bei Google für Ihre Homepage – Besucher garantiert!</em>' +
                '<ul><li>Mit Google-AdWords finden interessierte Besucher auf Ihre Website. </li>' +
                '<li>Sie entscheiden, wie viele Zugriffe von potenziellen Kunden Sie haben möchten: 4 Pakete mit Klick-Garantie zur Auswahl. </li>' +
                '<li>Rundum-Werbe-Service: Profis analysieren Ihre Homepage</li></ul>';
      
      }
      
    };

  },
  
  footer: function() {

    return {
  
      phase: 0,
      
      markup: function() {
      
        return  '<div class="info"><p>Werbe-Paket</p>' +
                '<label>Nur heute! <span class="price">39,99 €*</span></label>' +
                '</div>' +
                '<a href="#" data-inc-type="module-part" data-inc-id="order" class="bt_def_small"></a>';
      
      }
      
    };

  },
  
  order: function() {

    return {
  
      phase: 1,
      
      constructor: function(container) {
      
        if ($J.cart) {
        
          $J.cart.setArticle('promotion', 'Werbe-Paket', 0);
        
        }
      
        container.addEventListener('click', function(container) {
        
          return function(e) {
        
            if ($J.cart) {
            
              $J.cart.addArticle('promotion');
              
              $J.app.renderModule('cart');
              
            }
            
            e.preventDefault();
            
          }
        
        }(container), false);
        
      },
      
      destructor: function(container) {
      
        container.removeEventListener('click');
        
      },
      
      markup: function() {
      
        return  'Bestellen';
      
      }

    }

  }
  
};
