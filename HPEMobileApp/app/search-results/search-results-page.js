const frameModule = require("ui/frame");

const SearchResultsViewModel = require("./search-results-view-model");

var fetchModule = require("fetch");
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
var searchResult = new SearchResultsViewModel();

function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (args.isBackNavigation) {
        return;
    }

    searchResult.searchFields = args.context;
    buildhttpRequest();

    const page = args.object;
    page.bindingContext = searchResult;
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

function newSearch(){
    frameModule.topmost().navigate("search/search-page");
}

function editSearch(){
    var navigationEntry = {
        moduleName: "search/search-page",
        context: searchResult.searchFields,
        animated: false
    };
    frameModule.topmost().navigate(navigationEntry);
}

function getSearchResults() {
    fetchModule.fetch(searchResult.httpRequest, {
        method: "GET"
    })
    .then(
        function (response) {
            searchResult.resultsJSON = response;
            //alert({ title: "GET Response", message: JSON.stringify(response), okButtonText: "Close" });
        }, 
        function (error) {
            console.log(JSON.stringify(error));
        }
    )
}

function buildhttpRequest() {
    var first = true;
    for (var key in searchResult.searchFields){
        if(searchResult.searchFields.hasOwnProperty(key) && searchResult.searchFields[key] != null){
            if(first){
                searchResult.httpRequest += "/search?";
                first = false;
            }else{
                searchResult.httpRequest += "&";
            }
            searchResult.httpRequest += key + "=" + searchResult.searchFields[key];
        }
    }
} 

    
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.newSearch = newSearch;
exports.editSearch = editSearch;
