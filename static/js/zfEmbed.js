window._zfQueue = window._zfQueue || []; // Only set if truly undefined

function _zf() { 
    window._zfQueue.push(arguments); 
}

(function() {
  if (!window.ZonkaFeedback) {  // Prevent multiple initializations
    ZonkaFeedback = function (en, fb) {
      document.body.addEventListener(en, fb, false);
    };
  }
})();
