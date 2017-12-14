const observableModule = require("data/observable");

var fetchModule = require("fetch");

function SearchResultsViewModel() {
    const viewModel = observableModule.fromObject({
        searchFields: null,
        httpRequest: "https://hpbackend.localtunnel.me/systems/Frenzy",
        results: null,
        list: null
    });

    viewModel.clearResults = function() {
        viewModel.results = null;
        viewModel.list.empty();
    };

    viewModel.clearRequest = function(){
        viewModel.httpRequest = "https://hpbackend.localtunnel.me/systems/Frenzy";
    }

    viewModel.getSearchResults = function(){
        return fetchModule.fetch(viewModel.httpRequest, {
            method: "GET"
        }).then(
            function (res) {
                console.log("Recieved response from server");                
                viewModel.results = JSON.parse(res._bodyText);
                if(viewModel.results == 404){
                    alert({ title: "Cannot connect to server", message: searchResult.results, okButtonText: "Close" });
                    searchResult.clearRequest();
                }else{
                    viewModel.list.fill(viewModel.results);
                }
            }, 
            function (error) {
                console.log(JSON.stringify(error));
            }
        )
    }

    return viewModel;
}

module.exports = SearchResultsViewModel;
