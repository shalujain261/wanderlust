const User = require("../models/user");

// for sign up form {get req}
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

// to Register user {post req}
module.exports.createUserForSignup = async (req, res) => {
  try {
    let { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    //This login function we logged in after signup --- ek baar user signup karega then that current user will logged in , no need to login again

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "User Registered Successfully");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    console.log(error);
    res.redirect("/signup");
  }
};


// for displaying Login Form{get req}
module.exports.renderLoginFrom = (req, res) => {
    res.render("users/login.ejs");
  }


//   User Logged In Successfully {Post route}
module.exports.createLoggedInUser = async (req, res) => {
  req.flash("success", "Welcome to Wanderlust! You are successfully Logged In");
  let redirect = res.locals.redirectUrl || "/listings";
  res.redirect(redirect);
};


// Get Request 
module.exports.logOutUser = (req, res, next) => {
    req.logout((err) => {
      if(err){
        return next(err);
      }
      req.flash("success", "You are Logged Out");
      res.redirect("/listings");
    })
  }
