'use strict';

var items = document.getElementsByTagName('*');

chrome.extension.onMessage.addListener(function(message) {
    switch (message.directive) {
        case 'popup-click':
            if( message.isToggle ) {
                for (var k = items.length - 1; k >= 0; k--) {
                    items[k].style.outline = '1px solid ' + message.gridfullColor + '';
                }
            } else {
                for (var i = items.length - 1; i >= 0; i--) {
                    items[i].style.outline = 'none';
                }
            }
        break;
        default:
    }
});

// console.log('content script');