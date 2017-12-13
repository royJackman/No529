const frameModule = require("ui/frame");
const LoginViewModel = require("./login-view-model");
const globalVars = require("./../app.js");

var fetchModule = require("fetch");
var page;
var email;
var password;

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (args.isBackNavigation) {
        return;
    }

    const page = args.object;
    page.bindingContext = new LoginViewModel();
}

/* ***********************************************************
 * According to guidelines, if you have a drawer on your page, you should always
 * have a button that opens it. Get a reference to the RadSideDrawer view and
 * use the showDrawer() function to open the app drawer section.
 *************************************************************/
function onDrawerButtonTap(args) {
    const sideDrawer = frameModule.topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;

exports.loaded = function(args) {
    page = args.object;
};

exports.login = function() {
    email = page.getViewById('email');
    pword = page.getViewById('password');
    console.log(email.text)
    var topmost = frameModule.topmost();
    if (email.text == "gordon@umass.edu" && pword.text == "packers") {
        global.companyName = "Frenzy"
        global.queryStart = global.serverLink + "/systems/" + global.companyName
        topmost.navigate('home/home-page');
    }
    else if (email.text == "tim" && pword.text == "tim"){
        global.companyName = "Chaos"
        topmost.navigate('home/home-page');
        global.queryStart = global.serverLink + "/systems/" + global.companyName
    }
    else {
        alert({ title: "Invalid Credentials", message: "Incorrect Username or Password. Please try again.", okButtonText: "Close" });
    }
};