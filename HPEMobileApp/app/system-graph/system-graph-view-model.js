const observableModule = require("data/observable");

var fetchModule = require("fetch");

function SystemGraphViewModel() {
    const viewModel = observableModule.fromObject({
        system: null,
        graph1: null,
        graph2: null
    });

    viewModel.clearModel = function() {
        viewModel.system = null;
        viewModel.graph1 = null;
        viewModel.graph2 = null;
    };

    viewModel.buildGraphs = function(){
        viewModel.buildGraph1();
        viewModel.buildGraph2();
    };

    viewModel.buildGraph1 = function(){
        viewModel.graph1 = [{key: "Normal", value: viewModel.system.disks_total_diskCountNormal},
                            {key: "Degraded", value: viewModel.system.disks_total_diskCountDegraded},
                            {key: "Failed", value: viewModel.system.disks_total_diskCountFailed}]
    };

    viewModel.buildGraph2 = function(){
        viewModel.graph2 = [{key: "Fibre Channel", value: viewModel.system.capacity_byType_fc_freeTiB},
                            {key: "NearLine", value: viewModel.system.capacity_byType_nl_freeTiB},
                            {key: "SSD", value: viewModel.system.capacity_byType_ssd_freeTiB}]
    };

    return viewModel;
}

module.exports = SystemGraphViewModel;
