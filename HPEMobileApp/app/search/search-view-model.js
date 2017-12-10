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

    return viewModel;
}

module.exports = SearchViewModel;
