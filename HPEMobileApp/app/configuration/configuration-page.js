const frameModule = require("ui/frame");

const ConfigurationViewModel = require("./configuration-view-model");

const ObservableArray = require("data/observable-array").ObservableArray;


/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
var configuration = new ConfigurationViewModel();
var configurationList = new ObservableArray();

function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (args.isBackNavigation) {
        return;
    }

    const page = args.object;
    configuration.system = args.context;
    configuration.list = configurationList;
    page.bindingContext = configuration;

    //Contains all the labels for different fields
    var labels = {  companyName: "Company Name:", 
                    systemName: "System Name:", 
                    serialNumber: "Serial Number:", 
                    productFamily: "Product Family:", 
                    model: "Model:", 
                    osVersion: "OS Version:", 
                    cpgCount: "CPG Count:", 
                    recommended_osVersion: "Rec. OS Version", 
                    location_region: "Region:", 
                    location_country: "Country:", 
                    installDate: "Install Date:", 
                    updated: "Info Updated:", 
                    nodes_nodeCount: "Node Count:", 
                    nodes_nodeCountOffline: "Nodes Offline:",  
                    disks_total_diskCount: "Disk Count:", 
                    disks_total_diskCountNormal: "Disks Normal:", 
                    disks_total_diskCountDegraded: "Disks Degraded:", 
                    disks_total_diskCountFailed: "Disks Failed:", 
                    vvCount: "Virtual Volumes(VV):", 
                    disksState: "Disk State:", 
                    tpvvCount: "Thinly Provisioned VV:", 
                    capacity_total_freePct: "% Raw Storage Free:", 
                    capacity_total_freeTiB: "Raw Storage Free(TiB):", 
                    capacity_byType_fc_freeTiB: "FC Storage Free:", 
                    capacity_byType_nl_freeTiB: "NL Storage Free:", 
                    capacity_byType_ssd_freeTiB: "SSD Storage Free:",
                    capacity_total_sizeTiB: "Total Storage:", 
                    capacity_byType_fc_sizeTiB: "FC Total Storage:", 
                    capacity_byType_nl_sizeTiB: "NL Total Storage:", 
                    capacity_byType_ssd_sizeTiB: "SSD Total Storage:",
                    capacity_total_compactionRatio: "Compaction Ratio:", 
                    capacity_total_compressionRatio: "Compression Ratio:", 
                    capacity_total_dedupeRatio: "Dedupe Ratio:", 
                    performance_portBandwidthData_total_dataRateKBPSAvg: "Avg Bandwidth(KBPS):", 
                    performance_portBandwidthData_total_iopsAvg: "Avg IOs/s:", 
                    performance_portBandwidthData_total_iopsMax: "Max IOs/s", 
                    performance_summary_portInfo_totalServiceTimeMillis: "Avg Service Time:", 
                    performance_summary_portInfo_readServiceTimeMillis: "Avg Read Service Time:", 
                    performance_summary_portInfo_writeServiceTimeMillis: "Avg Write Service Time:", 
                    performance_summary_delAckPct: "% Delayed Ack:", 
                    performance_summary_vvInfo_vvsByType_ssd_readBandwidthMBPS: "SSD Avg Read Bandwidth:", 
                    performance_summary_vvInfo_vvsByType_ssd_writeBandwidthMBPS: "SSD Avg Write Bandwidth:", 
                    performance_summary_vvInfo_vvsByType_ssd_readServiceTimeMillis: "SSD Read Service Time:", 
                    performance_summary_vvInfo_vvsByType_ssd_writeServiceTimeMillis: "SSD Write Service Time:", 
                    nodes_cpuAvgMax: "Max Avg CPU Util:"};
    
    //Empty Observable array to make room for new info
    while (configurationList.length) {
        configurationList.pop();
    }

    //Fills the Observable array with information needed for display
    for(var key in labels){
        configurationList.push({
            label: labels[key],
            value: configuration.system[key]
        })
    }
}

/* ***********************************************************
 * According to guidelines, if you have a drawer on your page, you should always
 * have a button that opens it. Get a reference to the RadSideDrawer view and
 * use the showDrawer() function to open the app drawer section.
 *************************************************************/
function onDrawerButtonTap(args) {
    const sideDrawer = frameModule.topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}
function backToList(args){
	var navigationEntry = {
		moduleName :"search-results/search-results-page",
        context: "Back",
	};
    frameModule.topmost().navigate(navigationEntry);
}


exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.backToList=backToList;