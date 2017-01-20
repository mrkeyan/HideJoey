console.log("content.js");
/*var users = document.getElementsByClassName("_36");
for (var i = 0; i < users.length; i++) {
    var user = users[i].textContent;
    console.log(user);
    if (user.match(/\bKeyan\b/)) {
        var msg = users[i].nextSibling;
        console.log(msg);
        msg.classList.add("hide_this");
    }
}*/
//global variables
var info = {};
var selector = "._ih3, ._4tdx";

function change() {
    if (info !== null) {
        var nodes = document.querySelectorAll(selector);
        for (var ii = 0, nn = nodes.length; ii < nn; ii++) {
            var text = nodes[ii] ? nodes[ii].textContent.toLowerCase() : '';
            if (text && text.indexOf(info.user) >= 0 && nodes[ii].nextSibling.style.display != 'none') {
                nodes[ii].nextSibling.style.display = 'none';
                console.log(nodes[ii].nextSibling.textContent);
            }
        }
    }else{
        console.log("info is null?");
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("something happening from the extension");
    info = request.data || {};
    change();
    sendResponse({ data: info, success: true });

});

document.addEventListener('DOMContentLoaded', function () {
    console.log('document is ready');
    change();
});

    (function () {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                var newNodes = mutation.addedNodes;
                //if (info !== null) {
                if (newNodes !== null) {
                    //._36 was the old class, now it's ._ih3
                    //maybe i can use the parent ._41ud
                    //first item would be the name and all following are messages
                    //._4tdx for small messenger chat window
                    change();
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