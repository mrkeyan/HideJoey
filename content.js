console.log("test");
// var users = document.getElementsByClassName("_36");
// for (var i = 0; i < users.length; i++) {
//     var user = users[i].textContent;
//     console.log(user);
//     if (user.match(/\bKeyan\b/)) {
//         var msg = users[i].nextSibling;
//         console.log(msg);
//         msg.classList.add("hide_this");
//     }
// }

var info= {};
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("something happening from the extension");
    info = request.data || {};
    sendResponse({ data: info, success: true });

});

(function() {
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            var newNodes = mutation.addedNodes;
            //if (info !== null) {
                if (newNodes !== null) {
                    var nodes = document.querySelectorAll("._36");
                    for (var ii = 0, nn = nodes.length; ii < nn; ii++) {
                        var text = nodes[ii] ? nodes[ii].textContent.toLowerCase() : '';
                        if (text && text.indexOf(info.user) >= 0 && nodes[ii].nextSibling.style.display != 'none') {
                            nodes[ii].nextSibling.style.display = 'none';
                            console.log(nodes[ii].nextSibling.textContent);
                        }
                    }
            }
        });
    });
    observer.observe(document, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false,
    });
})();