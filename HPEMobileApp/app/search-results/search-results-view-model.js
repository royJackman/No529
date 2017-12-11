const observableModule = require("data/observable");

//const searchViewModel = require("./../search/search-view-model");

function SearchResultsViewModel() {
    const viewModel = observableModule.fromObject({
        searchFields: null,
        httpRequest: "https://nqexnakqdo.localtunnel.me/systems/Frenzy",
        resultsJSON: null,
        results: null
    });

    return viewModel;
}

module.exports = SearchResultsViewModel;
