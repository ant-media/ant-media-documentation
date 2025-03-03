/*window._zfQueue = window._zfQueue || []; // Only set if truly undefined

function _zf() { 
    window._zfQueue.push(arguments); 
}

(function() {
  if (!window.ZonkaFeedback) {  // Prevent multiple initializations
    ZonkaFeedback = function (en, fb) {
      document.body.addEventListener(en, fb, false);
    };
  }
})();*/

window._zfQueue = window._zfQueue || []; // Ensure _zfQueue exists

function _zf() { 
    window._zfQueue.push(arguments); 
}

(function() {
  if (!window.ZonkaFeedback) {  // Prevent multiple initializations
    ZonkaFeedback = function (en, fb) {
      document.body.addEventListener(en, fb, false);
    };
  }

  // Function to apply custom styles to the feedback button
  function customizeFeedbackButton() {
    let buttonContainer = document.getElementById("ZfEmbedFlypopBottomButton");

    if (buttonContainer) {
      let button = buttonContainer.querySelector("button");
      if (button) {
        button.style.cssText = `
          font-size: 18px !important;
          padding: 14px 28px !important;
          width: 260px !important;
          height: 40px !important;
          border-radius: 10px !important;
          background-color: #1e1e1f !important;
          color:rgba(0, 0, 0, 0.1) !important;
          border: none !important;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2) !important;
        `;
      }
    }
  }

  // MutationObserver: Watches for widget being added
  function observeWidget() {
    const observer = new MutationObserver(() => {
      customizeFeedbackButton();
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Apply styles as soon as DOM is ready
  document.addEventListener("DOMContentLoaded", function() {
    observeWidget();
    customizeFeedbackButton(); // Apply immediately if already available
  });

})();
