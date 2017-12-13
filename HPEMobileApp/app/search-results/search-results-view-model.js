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
                viewModel.results = JSON.parse(res._bodyText);
                console.log(viewModel.results);
                if(viewModel.results != 404){
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
