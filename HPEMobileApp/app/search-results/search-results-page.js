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

    searchResult.list = searchResultList;

    const page = args.object;    
    page.bindingContext = searchResult;

    //This checks if we are returning from viewing a system's info. We want to display what we already found.
    if(args.context == "back") return;

    searchResult.searchFields = args.context;
    var oldhttp = searchResult.httpRequest;
    searchResult.clearRequest();
    buildhttpRequest();
    //This makes sure we don't send the same request multiple times in a row.
    if(oldhttp != searchResult.httpRequest){
        searchResult.set("isLoading", true);
        searchResult.clearResults();
        searchResult.getSearchResults().then(function(){
            searchResult.set("isLoading", false);
            if(searchResult.results == 404){
                alert({ title: "Cannot connect to server", message: searchResult.results, okButtonText: "Close" });
            }
        });
    }
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

// function getSearchResults() {
//     console.log("got here 0\n");
//     fetchModule.fetch(searchResult.httpRequest, {
//         method: "GET"
//     }).then(
//         function (res) {
//             //console.dir(res);
//             //console.log("got here 1\n");
//             searchResult.results = JSON.parse(res._bodyText);
//             //console.log("got here 2\n");
//             //console.dir(searchResult.results);
//             //alert({ title: "GET Response", message: JSON.stringify(response), okButtonText: "Close" });
//             searchResult.results.forEach(function(sys) {
//                 searchResultList.push({
//                     system: sys,
//                     detailedView: function(){
//                         var navigationEntry = {
//                             moduleName: "configuration/configuration-page",
//                             context: this.system,
//                             animated: false
//                         };
//                         frameModule.topmost().navigate(navigationEntry);
//                     }
//                 });
//             });
//             searchResult.set("isLoading", false);
//         }, 
//         function (error) {
//             console.log(JSON.stringify(error));
//         }
//     )
// }

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
