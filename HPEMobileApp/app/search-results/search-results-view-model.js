const observableModule = require("data/observable");

const searchViewModel = require("./../search/search-view-model");

function SearchResultsViewModel() {
    const viewModel = observableModule.fromObject({
        searchRequest: null,
        results: null
    });

    return viewModel;
}

module.exports = SearchResultsViewModel;
