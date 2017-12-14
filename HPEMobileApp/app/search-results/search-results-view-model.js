const observableModule = require("data/observable");

var fetchModule = require("fetch");

function SearchResultsViewModel() {
    const viewModel = observableModule.fromObject({
        searchFields: null,
        httpRequest: global.queryStart,
        results: null,
        list: null
    });

    viewModel.clearResults = function() {
        viewModel.results = null;
        viewModel.list.empty();
    };

    viewModel.clearRequest = function(){
        viewModel.httpRequest = global.queryStart;
    }

    viewModel.getSearchResults = function(){
        return fetchModule.fetch(viewModel.httpRequest, {
            method: "GET"
        }).then(
            function (res) {
                console.log("Recieved response from server");                
                viewModel.results = JSON.parse(res._bodyText);
                if(viewModel.results == "404"){
                    alert({ title: "Cannot connect to server", okButtonText: "Close" });
                    viewModel.clearRequest();
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
