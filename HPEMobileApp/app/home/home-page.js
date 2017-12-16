const frameModule = require("ui/frame");

const HomeViewModel = require("./home-view-model");
//const LoginViewModel = require("./login-view-model");

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
    var topmost = frameModule.topmost();
    topmost.navigate("graph/avgGraph-page");
    //graph4Data()
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
                var serviceTimeVal = JSON.stringify(jsn[i].performance_summary_portInfo_totalServiceTimeMillis);
                var readTimeVal = JSON.stringify(jsn[i].performance_summary_portInfo_readServiceTimeMillis);
                var writeTimeVal = JSON.stringify(jsn[i].performance_summary_portInfo_writeServiceTimeMillis);
                var subArr = { serviceTime: serviceTimeVal, readTime: readTimeVal, writeTime: writeTimeVal };
                retArr.push(subArr);
            }

            console.log(retArr.toString());

        }, function (error) {
            console.log("error");
        })

}

function graph2Data() {
    var finalArr2 = []
    fetchModule.fetch(global.queryStart, { method: "GET" })
        .then(function (response) {
            var jsn = JSON.parse(response._bodyText);

            for (i in jsn) {
                rawVal = JSON.stringify(jsn[i].capacity_total_freeTiB);
                ssdVal = JSON.stringify(jsn[i].capacity_byType_ssd_freeTiB);
                var tempDict = { raw: rawVal, ssd: ssdVal };
                finalArr2.push(tempDict);
            }

            console.log(finalArr2.toString());

        }, function (error) {
            console.log("error");
        })

}

function graph3Data() {
    var retDict = [];
    fetchModule.fetch(global.queryStart, {method: "GET"})
        .then(function (response) {
            var jsn = JSON.parse(response._bodyText);

            var tempDict = {}

            for (i in jsn) {
                country = JSON.stringify(jsn[i].location_country);

                if (tempDict[country] != undefined) {
                    tempDict[country] = tempDict[country] + 1;
                }
                else {
                    tempDict[country] = 1;
                }

            }
            for (var key in tempDict) {
                var littleDict = { country: key, count: tempDict[country] };
                retDict.push(littleDict);
            }

            console.log(retDict.toString());

        }, function (error) {
            console.log("error");
        })

}

function graph4Data() {
    var finalArr4 = []

    fetchModule.fetch(global.queryStart, { method: "GET" })
        .then(function (response) {
            var jsn = JSON.parse(response._bodyText);



            for (i in jsn) {
                countVal = JSON.stringify(jsn[i].disks_total_diskCount);
                normalVal = JSON.stringify(jsn[i].disks_total_diskCountNormal);

                var tempDict = { count: countVal, normal: normalVal };
                finalArr4.push(tempDict)
            }

            console.log(finalArr4.toString());

            //topmost.navigate('home/home-page');

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
exports.graph1Data = graph1Data;
exports.graph2Data = graph2Data;
exports.graph3Data = graph3Data;
exports.graph4Data = graph4Data;

