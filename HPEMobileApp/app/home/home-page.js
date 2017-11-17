const frameModule = require("ui/frame");

const HomeViewModel = require("./home-view-model");

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
    page.bindingContext = new HomeViewModel();
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

function buttonTap1(args) {
    var topmost = frameModule.topmost();
    topmost.navigate("graph/graph1-page");
}

function buttonTap2(args) {
    var topmost = frameModule.topmost();
    topmost.navigate("graph/graph2-page");
}

function buttonTap3(args) {
    var topmost = frameModule.topmost();
    topmost.navigate("graph/graph3-page");
}

function buttonTap4(args) {
    var topmost = frameModule.topmost();
    topmost.navigate("graph/graph4-page");
}

exports.buttonTap1 = buttonTap1;
exports.buttonTap2 = buttonTap2;
exports.buttonTap3 = buttonTap3;
exports.buttonTap4 = buttonTap4;
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
