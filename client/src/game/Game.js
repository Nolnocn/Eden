"use strict";

var Game = (function () {
    
    var pGame;
    
    var DEFAULT_GAME_WIDTH = 800;
    var DEFAULT_GAME_HEIGHT = 600;
    
    var connectingText;
 
    function init()
    {
        pGame = new Phaser.Game( DEFAULT_GAME_WIDTH, DEFAULT_GAME_HEIGHT, Phaser.AUTO, "game", { 
            preload: preload,
            create: create,
            update: update
        } );
    
        setGameSize();
    }
    
    // Sorta from: http://www.html5gamedevs.com/topic/1638-changing-game-size-to-fit-page/
    function setGameSize()
    {
        var width = Math.min( DEFAULT_GAME_WIDTH, window.innerWidth );
        var height = Math.min( DEFAULT_GAME_HEIGHT, window.innerHeight );

        pGame.width = width;
        pGame.height = height;
        //game.stage.bounds.width = width;
        //game.stage.bounds.height = height;

        if ( pGame.renderType === Phaser.WEBGL )
        {
            pGame.renderer.resize(width, height);
        }
        
        if( height < window.innerHeight )
        {
            var offset = ( window.innerHeight - height ) * 0.4;
            $( "#game" ).offset( { top: offset } );
        }
        else
        {
            $( "#game" ).offset( { top: 0 } );
        }
    }

    function preload()
    {
        //game.load.image('logo', 'phaser.png');
    }

    function create()
    {
        pGame.world.setBounds( 0, 0, DEFAULT_GAME_WIDTH * 2, DEFAULT_GAME_HEIGHT * 2 );
        pGame.physics.startSystem( Phaser.Physics.ARCADE );
        
        pGame.stage.backgroundColor = "#00FF00";
        
        connectingText = pGame.add.text( pGame.width * 0.5, pGame.height * 0.5, "Connecting to Server", { 
            font: "5em Cinzel",
            fill: "#FFF"
        } );
        
        connectingText.anchor.setTo( 0.5, 0.5 );

        //var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        //logo.anchor.setTo(0.5, 0.5);
    }

    function update()
    {
        //console.log( "update" );
    }
    
    $( window ).resize( setGameSize );
 
    return {
        getInstance: function () {
            if ( !pGame )
            {
                init();
            }
            
            return pGame;
        }
    };
})();