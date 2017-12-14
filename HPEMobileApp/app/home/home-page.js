const frameModule = require("ui/frame");

const HomeViewModel = require("./home-view-model");

var fetchModule = require("fetch");

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
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
    page.bindingContext = new HomeViewModel();
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

function avgGraphButton(args) {
    //var topmost = frameModule.topmost();
    //topmost.navigate("graph/avgGraph-page");
    graph4Data()
}

function histCapButton(args) {
    var topmost = frameModule.topmost();
    topmost.navigate("graph/histCap-page");
}

function hpeParModelButton(args) {
    var topmost = frameModule.topmost();
    topmost.navigate("graph/hpeParModel-page");
}

function lastPortalButton(args) {
    var topmost = frameModule.topmost();
    topmost.navigate("graph/lastPortal-page");
}






function graph1Data() {
    var retArr = [];
    fetchModule.fetch(global.queryStart, { method: "GET" })
        .then(function (response) {
            var jsn = JSON.parse(response._bodyText);

            for (i in jsn) {
                serviceTime = JSON.stringify(jsn[i].performance_summary_portInfo_totalServiceTimeMillis);
                readTime = JSON.stringify(jsn[i].performance_summary_portInfo_readServiceTimeMillis);
                writeTime = JSON.stringify(jsn[i].performance_summary_portInfo_writeServiceTimeMillis);
                var subArr = [serviceTime, readTime, writeTime];
                retArr.push(subArr);
            }

            //Hey Roy how ya doing today
            //Well because of these annoying ass promises call ur graph function right here
            //use retArr

        }, function (error) {
            console.log("error");
        })

}

function graph2Data() {
    var rawArr = [];
    var ssdArr = [];
    fetchModule.fetch(global.queryStart, { method: "GET" })
        .then(function (response) {
            var jsn = JSON.parse(response._bodyText);

            for (i in jsn) {
                raw = JSON.stringify(jsn[i].capacity_total_freeTiB);
                ssd = JSON.stringify(jsn[i].capacity_byType_ssd_freeTiB);

                rawArr.push(raw);
                ssdArr.push(ssd);
            }

            var finalArr2 = [rawArr, ssdArr]

            //Hey Roy how ya doing today
            //Well because of these annoying ass promises call ur graph function right here
            //use finalArr2

        }, function (error) {
            console.log("error");
        })

}

function graph3Data() {
    var retDict = {};
    fetchModule.fetch(global.queryStart, {method: "GET"})
        .then(function (response) {
            var jsn = JSON.parse(response._bodyText);

            for (i in jsn) {
                country = JSON.stringify(jsn[i].location_country);
                if (retDict[country] != undefined) {
                    retDict[country] = retDict[country] + 1;
                }
                else {
                    retDict[country] = 1;
                }

            }

            //Hey Roy how ya doing today
            //Well because of these annoying ass promises call ur graph function right here
            //use retDict

        }, function (error) {
            console.log("error");
        })

}

function graph4Data() {
    var countArr = [];
    var normalArr = [];
    fetchModule.fetch(global.queryStart, { method: "GET" })
        .then(function (response) {
            var jsn = JSON.parse(response._bodyText);

            for (i in jsn) {
                count = JSON.stringify(jsn[i].disks_total_diskCount);
                normal = JSON.stringify(jsn[i].disks_total_diskCountNormal);

                countArr.push(count);
                normalArr.push(normal);
            }

            var finalArr4 = [countArr, normalArr]

            //Hey Roy how ya doing today
            //Well because of these annoying ass promises call ur graph function right here
            //use finalArr4

        }, function (error) {
            console.log("error");
        })

}




exports.avgGraphButton = avgGraphButton;
exports.histCapButton = histCapButton;
exports.hpeParModelButton = hpeParModelButton;
exports.lastPortalButton = lastPortalButton;
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.graph3Data = graph3Data;

