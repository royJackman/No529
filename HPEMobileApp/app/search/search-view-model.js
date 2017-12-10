const observableModule = require("data/observable");

function SearchViewModel() {
    const viewModel = observableModule.fromObject({
        system_ID: "",
        company: "",
        serial_Num: "",
        prod_family: "",
        model: "",
        osVersion: "",
        region: "",
        country: ""
    });

    viewModel.empty = function() {
        viewModel.system_ID = "";
        viewModel.company = "";
        viewModel.serial_Num = "";
        viewModel.prod_family = "";
        viewModel.model = "";
        viewModel.osVersion = "";
        viewModel.region = "";
        viewModel.country = "";
    }; 

    return viewModel;
}

module.exports = SearchViewModel;
