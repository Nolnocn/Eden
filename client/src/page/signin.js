"use strict";

var app = app || {};

// Handles serializing the sign in form and sending it to the server for validation
$( document ).ready( function() {
    $( "#loginSubmit" ).on( "click", function( e ) {
        e.preventDefault();
    
        if( $( "#user" ).val() == '' || $( "#pass" ).val() == '' )
        {
            app.handleError( "Username or password is empty" );
            return false;
        }
        
        app.sendAjax( $( "#loginForm" ).attr( "action" ), $( "#loginForm" ).serialize() );

        return false;
    });
});