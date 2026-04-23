// Ensure queue exists
window._zfQueue = window._zfQueue || [];

function _zf() {
  window._zfQueue.push(arguments);
}

// Load Zonka script (only once)
(function () {
  if (!document.getElementById("zfEmbedScript")) {
    var sc = document.createElement("script");
    sc.async = true;
    sc.id = "zfEmbedScript";
    sc.src = "https://us-js.zonka.co/679b6f226131b4000836e0bf";

    var firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(sc, firstScript);
  }
})();
