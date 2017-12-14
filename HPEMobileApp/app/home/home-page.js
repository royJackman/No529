const frameModule = require("ui/frame");

const HomeViewModel = require("./home-view-model");

var fetchModule = require("fetch");

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
    //graph3Data()
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





function graph3Data() {
    var retDict = {};
    fetchModule.fetch(global.queryStart, {method: "GET"})
        .then(function (response) {
            var jsn = JSON.parse(response._bodyText);

            for (i in jsn) {
                console.log("t")
                country = JSON.stringify(jsn[i].location_country);
                console.log(country)
                if (retDict[country] != undefined) {
                    retDict[country] = retDict[country] + 1;
                }
                else {
                    retDict[country] = 1;
                }
                console.log(JSON.stringify(retDict))

            }

            //Hey Roy how ya doing today
            //Well because of these annoying ass promises call ur graph function right here

        }, function (error) {
            console.log("error");
        })

}






exports.avgGraphButton = avgGraphButton;
exports.histCapButton = histCapButton;
exports.hpeParModelButton = hpeParModelButton;
exports.lastPortalButton = lastPortalButton;
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.graph3Data = graph3Data;

