const frameModule = require("ui/frame");

const SearchResultsViewModel = require("./search-results-view-model");

const SearchResultsListViewModel = require("./search-results-list-view-model");

var fetchModule = require("fetch");
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
var searchResult = new SearchResultsViewModel();

var searchResultList = new SearchResultsListViewModel();

function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (args.isBackNavigation) {
        return;
    }

    //This checks if we are returning from viewing a system's info. We want to display what we already found.
    if(args.context == "Back") {
        return;
    }

    searchResult.list = searchResultList;

    const page = args.object;    
    page.bindingContext = searchResult;

    searchResult.searchFields = args.context;

    searchResult.clearRequest();
    buildhttpRequest();
    console.log(searchResult.httpRequest);

    searchResult.set("isLoading", true);
    searchResult.clearResults();
    searchResult.getSearchResults().then(function(){
        searchResult.set("isLoading", false);
    });
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
        context: searchResult.searchFields
    };
    frameModule.topmost().navigate(navigationEntry);
}

//Builds http request for given search request
function buildhttpRequest() {
    var first = true;
    searchResult.httpRequest += "/";
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
