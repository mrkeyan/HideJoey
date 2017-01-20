// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */


function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function () {
  getCurrentTabUrl(function (url) {
  });
  //var txt1 = document.getElementById('messageUrl');
  var txt2 = document.getElementById('user');
  var button1 = document.getElementById('ignoreUser');
  var button2 = document.getElementById('loadData');
  //var myUrl;
  var user;
  
  function getChromeStorage() {
    chrome.storage.sync.get("myData", function (info) {
      if (!chrome.runtime.error) {
        console.log(info);
        console.log("get data");
        /*
        chrome.tabs.getSelected(null, function (tab) {
          txt1.value = tab.url;
        });
        */
        if(info.myData !== null){
          txt2.value = info.myData;          
        }        
      } else {
        console.log("get error fail");
      }
    });
  }
  getChromeStorage();

  //Ignore button, save url and name
  button1.addEventListener('click', function () {
    $('#status').html('Clicked ignore button');
    //myUrl = $('#messageUrl').val();
    user = $('#user').val().toLowerCase();
    if (/*!myUrl | */!user) {
      $('#status').html('Invalid text provided');
      return;
    }
    chrome.storage.sync.set({ "myData": user }, function () {
      if (chrome.runtime.error) {
        console.log("runtime error");
      }
    });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      //var tabUrl = tabs[0].url;
      //chrome.tabs.sendMessage(tabs[0].id, { data: { myUrl, user, tabUrl } }, function (response) {
        chrome.tabs.sendMessage(tabs[0].id, { data: { user } }, function (response) {
        $('#status').html('changed data in page');
        console.log('success');
      });
    });
  });

  //Load button, load url and name from chrome.storage
  button2.addEventListener('click', function () {
    $('#status').html('Clicked load button');
    getChromeStorage();
  })
});
