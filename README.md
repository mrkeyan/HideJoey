# HideJoey
Hide a user on Facebook Messenger
A small Chrome Extension that started out as a way to block a specific user in my Facebook Messenger group chat.

How does it work?:
Upon submitting a URL and user the extension will check for message divs containing the specific user's name.
When it finds one the css is changed to display: none; and logs the ignored message to the console.

v1.1:
- input URL and name of user to block
- auto populate url based on active facebook tab

to fix:
- Facebook just changed their messenger layout so the original way of finding class ._36 and ignoring based on nextSibling doesn't work anymore


features to add:
- input validation
- storing of data (chrome.storage.sync.set?)
- message specific ignoring, currently ignoring across all messages
