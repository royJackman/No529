const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;
const frameModule = require("ui/frame");
var fetchModule = require("fetch");

function SearchResultsListViewModel() {
    const viewModel = new ObservableArray();

    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    viewModel.fill = function(sysList) {
        sysList.forEach(function(sys) {
            viewModel.push({
                system: sys,
                detailedView: function(){
                    var navigationEntry = {
                        moduleName: "configuration/configuration-page",
                        context: sys
                    };
                    frameModule.topmost().navigate(navigationEntry);
                }
            });
        });
    }

    return viewModel;
}

module.exports = SearchResultsListViewModel;