"use strict";

var app = app || {};

(function() {
    function handleError( message )
    {
        alert( message );
    }

    function sendAjax( action, data )
    {
        $.ajax( {
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function( result, status, xhr ) {
                window.location = result.redirect;
            },
            error: function( xhr, status, error ) {
                var messageObj = JSON.parse( xhr.responseText );

                handleError( messageObj.error );
            }
        } );        
    }
    
    app.handleError = handleError;
    app.sendAjax = sendAjax;
})();