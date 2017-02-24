'use strict';

var isToggle;
var gridfullColor;

// set settings
if(typeof(Storage) !== 'undefined' ) {
    if ( localStorage.getItem('isGridfullStateSet') === undefined || localStorage.getItem('isGridfullStateSet') === null ) {

        // if localStorage not set yet, set once
        localStorage.setItem('isToggle', false);
        localStorage.setItem('gridfullColor', 'rgba(0,0,0,0.2)');
        localStorage.setItem('isGridfullStateSet', true);

        isToggle = localStorage.getItem('isToggle');
        gridfullColor = localStorage.getItem('gridfullColor');

        sendMessage( gridfullColor );

    } else {

        // pull existing localStorage
        isToggle = localStorage.getItem('isToggle');
        gridfullColor = localStorage.getItem('gridfullColor');

    }
} else {
    console.log( 'no localStorage' );
}

// dispatch message
function sendMessage( gridfullColor ) {
    chrome.tabs.query({active:true, currentWindow: true}, function(tab){
        chrome.tabs.sendMessage(tab[0].id, {
            directive: 'popup-click',
            isToggle: isToggle,
            gridfullColor: gridfullColor
        }, function() {
            chrome.tabs.executeScript(null, { file: 'scripts/contentscript.js' });
        });
    });

    localStorage.setItem('gridfullColor', gridfullColor);
}

// dispatch message
$('#gridfull-toggle').on('click', function() {
    if ( isToggle ) {
        isToggle = false;
        localStorage.setItem('isToggle', false);
    } else {
        isToggle = true;
        localStorage.setItem('isToggle', true);
    }
    sendMessage( gridfullColor );
});

// color picking
$('#gridfull-colorpick').spectrum({
    color: gridfullColor,
    showAlpha: true,
    move: function(color) {
        var r = Math.round(color._r);
        var g = Math.round(color._g);
        var b = Math.round(color._b);
        var a = color._a;
        var rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

        gridfullColor = rgba;
        sendMessage( gridfullColor );
    }
});

// init
(function(){
    if ( isToggle ) {
        $('#gridfull-toggle').prop('checked', isToggle);
        sendMessage( gridfullColor );
    } else {
        $('#gridfull-toggle').prop('checked', isToggle);
    }
})();

// console.log('popup script');


