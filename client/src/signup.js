"use strict";

var app = app || {};

$( document ).ready( function() {
    $( "#signupSubmit" ).on( "click", function( e ) {
        e.preventDefault();
    
        if( $( "#user" ).val() == '' || $( "#pass" ).val() == '' || $( "#pass2" ).val() == '' )
        {
            app.handleError( "All fields are required" );
            return false;
        }
        
        if( $( "#pass" ).val() !== $( "#pass2" ).val() )
        {
            app.handleError( "The passwords do not match" );
            return false;           
        }

        app.sendAjax( $( "#signupForm" ).attr( "action" ), $( "#signupForm" ).serialize() );
        
        return false;
    } );
});