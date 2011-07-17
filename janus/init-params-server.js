// init global Janus object

if (typeof $J === 'undefined') {

  $J = {};
  
}

$J.initParams = {};

$J.initParams.initialRendering = true;

document = {};

document.getElementsByTagName = function(tagName) {

}

document.getElementById = function(id) {
  
  var myregexp = new RegExp('/id="' + id + '"/');
  
  var result = document.html.search(myregexp);
  
  if (result !== -1) {
  
    // see index.html
  
  }
  
}

document.html = '';
document.head = document.getElementsByTagName('head')[0];
document.body = document.getElementsByTagName('body')[0];

