var models = require( "../models" );

var Account = models.Account;

function loginPage( req, res )
{
    res.render( "login", { csrfToken: req.csrfToken() } );
}

function signupPage( req, res )
{
    res.render( "signup", { csrfToken: req.csrfToken() } );
}

function logout( req, res )
{
    req.session.destroy();
    res.redirect( "/" );
}

function login( req, res )
{
    var body = req.body;
    if( !body.username || !body.pass )
    {
        return res.status( 400 ).json( { error: "All fields required" } );
    }
    
    Account.AccountModel.authenticate( body.username, body.pass, function( err, account ) {
        if( err || !account )
        {
            return res.status( 400 ).json( { error: "Incorrect username or password" } );
        }
        
        req.session.account = account.toAPI();
    } );
}

function signup( req, res )
{
    var body = req.body;
    if( !body.username || !body.pass || !body.pass2 )
    {
        return res.status( 400 ).json( { error: "All fields are required" } );
    }
    
    if( body.pass !== body.pass2 )
    {
        return res.status( 400 ).json( { error: "Passwords don't match" } );
    }
    
    Account.AccountModel.generateHash( body.pass, function( salt, hash) {
        var accountData = {
            username: body.username,
            salt: salt,
            password: hash
        };
        
        var newAccount = new Account.AccountModel( accountData );
        
        newAccount.save( function( err ) {
            if( err )
            {
                console.log( err );
                return res.status( 400 ).json( { error: "An error occured" } );
            }
            
            req.session.account = newAccount.toAPI();
            
            res.json( { redirect: "/play" } );
        } );
    } );
}

function play( req, res )
{
    console.log( req.session.account.username );
    res.render( "app", { csrfToken: req.csrfToken(), name: req.session.account.username } );
}

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signupPage = signupPage;
module.exports.signup = signup;
module.exports.play = play;
