// Verifies the user is logged in
function requiresLogin( req, res, next )
{
    if( !req.session.account )
    {
        return res.redirect( "/" );
    }
    
    next();
}

// Verifies the user is logged out
function requiresLogout( req, res, next )
{
    if( req.session.account )
    {
        return res.redirect( "/play" );
    }
    
    next();
}

// Verifies the user is using https
function requiresSecure( req, res, next )
{
    if( req.headers[ "x-forwarded-proto" ] != "https" )
    {
        return res.redirect( "https://" + req.host + req.url );
    }
    next();
}

// Debug to bypass https requirement
function bypassSecure( req, res, next )
{
    next();
}

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

if( process.env.NODE_ENV === "production" )
{
    module.exports.requiresSecure = requiresSecure;
}
else
{
    module.exports.requiresSecure = bypassSecure;
}
