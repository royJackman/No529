const observableModule = require("data/observable");

function SearchViewModel() {
    const viewModel = observableModule.fromObject({
        systemName: "",
        companyName: "",
        serialNumber: "",
        productFamily: "",
        model: "",
        osVersion: "",
        location_region: "",
        location_country: ""
    });

    viewModel.empty = function() {
        viewModel.systemName = "";
        viewModel.companyName = "";
        viewModel.serialNumber = "";
        viewModel.productFamily = "";
        viewModel.model = "";
        viewModel.osVersion = "";
        viewModel.location_region = "";
        viewModel.location_country = "";
    }; 

    return viewModel;
}

module.exports = SearchViewModel;
