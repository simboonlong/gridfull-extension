'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
    // console.log('previousVersion', details.previousVersion);
});
chrome.browserAction.setBadgeText({text: 'grid'});

// console.log('background script');
