const frameModule = require("ui/frame");

const SystemGraphViewModel = require("./system-graph-view-model");

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
var systemGraphs = new SystemGraphViewModel();


function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (args.isBackNavigation) {
        return;
    }
    
    systemGraphs.clearModel();

    const page = args.object;    
    page.bindingContext = systemGraphs;

    systemGraphs.system = args.context;
    systemGraphs.buildGraphs();
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

function back(){
    var navigationEntry = {
        moduleName: "configuration/configuration-page",
        context: systemGraphs.system
    };
    frameModule.topmost().navigate(navigationEntry);
}
 
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.back = back;
