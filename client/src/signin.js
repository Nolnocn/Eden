"use strict";

var app = app || {};

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