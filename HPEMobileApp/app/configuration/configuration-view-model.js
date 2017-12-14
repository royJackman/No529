const observableModule = require("data/observable");

function ConfigurationViewModel() {
    const viewModel = observableModule.fromObject({
        system: null,
        list: null
    });

    return viewModel;
}

module.exports = ConfigurationViewModel;
