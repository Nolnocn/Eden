var fire = {
    x: 800,
    y: 600
};

var loveTree = {
    x: 1200,
    y: 900
};

var trees = [];

// initializes some random trees in the world
function init()
{
    for( var i = 0; i < 17; i++ )
    {
        generateTree( 0, 600, 0, 1200 );
    }
    
    for( var j = 0; j < 15; j++ )
    {
        generateTree( 600, 1600, 0, 500 );
    }
    
    for( var k = 0; k < 18; k++ )
    {
        generateTree( 600, 1100, 700, 1200 );
    }
}

// Generates a tree with a random position within the given x and y ranges
function generateTree( minX, maxX, minY, maxY )
{
    var tree = {
        x: Math.random() * ( maxX - minX ) + minX,
        y: Math.random() * ( maxY - minY ) + minY
    };
    
    trees.push( tree );
}

// Sends the world data to the given socket
function sendWorldData( socket )
{
    var data = {
        fire: fire,
        loveTree: loveTree,
        trees: trees
    };
    
    socket.emit( "worldData", data );
}

module.exports.init = init;
module.exports.sendWorldData = sendWorldData;