var { unless } = require("express-unless");

const requireAuth = (req, res, next) => {
    console.log(`session: ${req.session.id}`)
    if (req.session && req.session.user) {
      // User is authenticated, proceed to the next middleware
      console.log('authenitcated')
      next();
    } else {
        console.log("Failed to authenticate")
        res.status(401).json("Unauthorized");
    }
};

requireAuth.unless = unless

module.exports = requireAuth