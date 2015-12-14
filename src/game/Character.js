var broadcast = require( "./network/broadcast.js" );

var STAT_MAX = 100;
var LOVE_COOLDOWN = 100000;

var GENDER = Object.freeze( {
    MALE: 0,
    FEMALE: 1
} );

var AGES = Object.freeze( {
    YOUNG: 0,
    ADULT: 1,
    OLD: 2,
    DEAD: 3
} );

var AGE_TIMES = Object.freeze( [
    0,
    150,
    450,
    600
] );

var MOVE_SPEEDS = Object.freeze( [
    7,
    5,
    3
] );

var HUNGER_RATES = Object.freeze( [
    2.0,
    1.0,
    0.7
] );

var FREEZE_RATES = Object.freeze( [
    2,
    1,
    3
] );

var FREEZE_STATES = Object.freeze( {
    WARM: -1,
    DEFAULT: 0,
    COLD: 1
} );

// Function constructor
function Character( gender, age, position )
{
    this.age = age || AGES.YOUNG;
    
    if( gender !== undefined )
    {
        this.gender = gender;
    }
    else
    {
        this.gender = Math.floor( Math.random() * 2 );
    }
    
    this.health = STAT_MAX;
    this.hunger = STAT_MAX;
    this.heat = STAT_MAX;
    
    this.ageTime = AGE_TIMES[ this.age ];
    this.loveTime = 0;
    
    this.freezeState = FREEZE_STATES.DEFAULT;
    
    this.moveSpeed = MOVE_SPEEDS[ this.age ];
    this.hungerRate = HUNGER_RATES[ this.age ];
    this.freezeRate = FREEZE_RATES[ this.age ];
    
    if( position )
    {
        this.position = position;
    }
    else
    {
        this.position = { x: 1200, y: 920 };
    }
    
    this.destination = this.position;
}

// Update function
Character.prototype.update = function( dt ) {
    if( this.age == AGES.DEAD )
    {
        return;
    }
    
    this.hunger -= this.hungerRate * dt;
    this.heat -= this.freezeRate * this.freezeState;
    this.ageTime += dt;
    
    if( this.ageTime >= AGE_TIMES[ this.age + 1 ] )
    {
        this.ageUp();
    }
};

// Increments the age and updates state vars
Character.prototype.ageUp = function() {
    this.age++;
    
    if( this.age < AGES.DEAD )
    {
        this.moveSpeed = MOVE_SPEEDS[ this.age ];
        this.hungerRate = HUNGER_RATES[ this.age ];
        this.freezeRate = FREEZE_RATES[ this.age ];
        
        var data = {
            id: this.id,
            age: this.age,
            moveSpeed: this.moveSpeed,
            hungerRate: this.hungerRate,
            freezeRate: this.freezeRate
        };
        
        broadcast.sendMessage( broadcast.EVENT_TYPE.CHAR_AGE_UP, data );
    }
    else
    {
        this.die();
    }
};

// Everybody dies
Character.prototype.die = function() {
    broadcast.sendMessage( broadcast.EVENT_TYPE.CHAR_DIED, { id: this.id } );
    var charMngr = require( "./characterManager.js" );
    charMngr.removeCharacter( this );
};

module.exports = Character;
