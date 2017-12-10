var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
const GraphViewModel = require("./graph-view-model");

var pageData = new Observable();
pageData.data = [
  { key: "April '17", value: 7.3 },
  { key: "Two", value: 5.0 },
  { key: "July '17", value: 6.2 },
  { key: "", value: 2.5 },
  { key: "", value: 3.9 }
];
exports.pageLoaded = function(args) {
  var page = args.object;
  page.bindingContext = pageData;
};


/************************************************************
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