$J.moduleConfig = function() {
}

$J.moduleConfig.prototype = {

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
      
        return '<h2>Hosting: Kontakte und E-Mails verwalten</h2>';
      
      }
      
    }

  },
  
  content: function() {

    return {
  
      phase: 0,
      
      markup: function() {
      
        return  '<h3 id="tuneUpTitle.mail-exchange-postfach">Outlook Exchange</h3>' +
                '<em>Outlook auch unterwegs von jedem internetfähigen PC oder Smartphone aus nutzen</em>' +
                '<ul><li class="wide">Mobiler Zugriff auf alle Funktionen wie E-Mails, Kontakte, Termine und Aufgaben dank zentraler Speicherung auf Exchange-Server.</li>' +
                '<li class="wide">Automatische Synchronisation für aktuellen Stand auf jedem Gerät </li>' +
                '<li class="mid">2 GB Speicherplatz und Microsoft Outlook 2007 als Download inklusive.</li></ul>';
      
      }
      
    };

  },
  
  footer: function() {

    return {
  
      phase: 0,
      
      markup: function() {
      
        return  '<div class="info"><p>Outlook Exchange</p>' +
                '<label>Nur heute! <span class="price">9,99 €*</span></label>' +
                '</div>' +
                '<a href="#" data-inc-type="module-part" data-inc-id="order" class="bt_def_small"></a>';
      
      }
      
    };

  },
  
  order: function() {

    return {
  
      phase: 1,
      
      constructor: function(container) {
      
        container.onclick = function(container) {
        
          return function() {
        
            alert("order!");
            
            return false;
            
          }
        
        }(container);
        
      },
      
      markup: function() {
      
        return  'Bestellen';
      
      }

    }

  }
  
};
