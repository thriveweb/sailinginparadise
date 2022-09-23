/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

// console.log("************** GA Defined : ", (typeof window.ga === 'function'));
// console.log("************** window.dataLayer : ", window.dataLayer);

/*

// Adjust the GA snippet on site
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'UA-77246883-1', {
    'linker': {
        'domains': ['rezdy.com']
    }
})

// Integrate code into every page
function check_ga() {
    if (typeof window.ga==='function') {
       ga(function(tracker) {
  
         // When using Google Tag Manager there is no default tracker
         if (tracker==undefined) {
           tracker=ga.getAll()[0];
         }
  
         // Gets the client ID of the default tracker.
         var gaClientId=tracker.get('clientId');
  
         // Gets all iframes on the page
         var rezdyElements=document.getElementsByClassName('rezdy');
  
         for (var i=0; i < rezdyElements.length; i++) {
           if (rezdyElements[i].contentWindow) {
  
               // Wait for Iframe receiver to be loaded
               rezdyElements[i].addEventListener("load", function() {
                 // Make sure you use your own company Alias here
                 this.contentWindow.postMessage(gaClientId, 'https://sailinginparadise.rezdy.com');
               });
           }
         }
      });
    } else {
      setTimeout(function(){check_ga();},500);
    }
  }
  check_ga();

  */
