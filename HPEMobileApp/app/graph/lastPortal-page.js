const frameModule = require("ui/frame");

const GraphViewModel = require("./graph-view-model");

var Observable = require("data/observable").Observable;

var pageData = new Observable();
pageData.typeData = [
  { type:"SystemA", count: 59 }, { type:"SystemB", count: 84 }, { type: "SystemC",count: 56 },
  { type: "SystemD", count: 90 }, { type:"SystemE", count: 118 },{ type: "SystemF", count: 66 },
];

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
    page.bindingContext = new GraphViewModel();
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

function goBackPage(args) {
    var topmost = frameModule.topmost();
    topmost.navigate("home/home-page");
}

exports.goBackPage = goBackPage;
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.pageLoaded = function(args) {
    var page = args.object;
    page.bindingContext = pageData;
  };
