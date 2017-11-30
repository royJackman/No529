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

function avgGraphButton(args) {
    var topmost = frameModule.topmost();
    topmost.navigate("graph/avgGraph-page");
}

function histCapButton(args) {
    var topmost = frameModule.topmost();
    topmost.navigate("graph/histCap-page");
}

function hpeParModelButton(args) {
    var topmost = frameModule.topmost();
    topmost.navigate("graph/hpeParModel-page");
}

function lastPortalButton(args) {
    var topmost = frameModule.topmost();
    topmost.navigate("graph/lastPortal-page");
}

exports.avgGraphButton = avgGraphButton;
exports.histCapButton = histCapButton;
exports.hpeParModelButton = hpeParModelButton;
exports.lastPortalButton = lastPortalButton;
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
