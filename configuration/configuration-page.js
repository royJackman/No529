const frameModule = require("ui/frame");

const ConfigurationViewModel = require("./configuration-view-model");

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
    page.bindingContext = new ConfigurationViewModel();
    var name = page.getViewById("name");
    var name_text="system";
    name.text = name_text;// it can set to the result of searching.
    var osVersion = page.getViewById("osversion");
    osVersion.text = "os###";
    var modelNumber = page.getViewById("modelnumber");
    modelNumber.text = "MN###";
    var serialNumber = page.getViewById("serialnumber");
    serialNumber.text = "SL###";
    var size = page.getViewById("size");
    size.text = "size###";
    //var update_system = page.getViewById("updateSystem");
    //update_system.on(buttonModule.Button.tapEvent, function (eventData) {
    //console.log("Hello World!");
   // },this);
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
function updateSystem(args){

    //frameModule.topmost().navigate("search-results/search-results-page");
    frameModule.topmost().navigate("updatesystem/updatesystem-page");
}


exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.updateSystem=updateSystem;