const observableModule = require("data/observable");

function SearchViewModel() {
    const viewModel = observableModule.fromObject({
        systemName: null,
        companyName: null,
        serialNumber: null,
        productFamily: null,
        model: null,
        osVersion: null,
        location_region: null,
        location_country: null,
        objectRepresentation: null
    });

    viewModel.empty = function() {
        viewModel.systemName = null;
        viewModel.companyName = null;
        viewModel.serialNumber = null;
        viewModel.productFamily = null;
        viewModel.model = null;
        viewModel.osVersion = null;
        viewModel.location_region = null;
        viewModel.location_country = null;
        viewModel.objectRepresentation = null;
    };

    viewModel.makeObject = function() {
        viewModel.objectRepresentation = {
            systemName: viewModel.systemName,
            companyName: viewModel.companyName,
            serialNumber: viewModel.serialNumber,
            productFamily: viewModel.productFamily,
            model: viewModel.model,
            osVersion: viewModel.osVersion,
            location_region: viewModel.location_region,
            location_country: viewModel.location_country
        };
    };

    return viewModel;
}

module.exports = SearchViewModel;
