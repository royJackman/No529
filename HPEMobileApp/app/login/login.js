const frameModule = require("ui/frame");
const LoginViewModel = require("./login-view-model");

var fetchModule = require("fetch");

var page;
var email;
var password;

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
    page.bindingContext = new LoginViewModel();
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

function generateGraphsAndNav() {

    var topmost = frameModule.topmost();

    var graph1 = [];
    var graph2 = [];
    var graph3 = [];
    var graph4 = [];

    fetchModule.fetch(global.queryStart, { method: "GET" })
        .then(function (response) {
            var jsn = JSON.parse(response._bodyText);

            //graph1
            for (i in jsn) {
                var serviceTimeVal = JSON.stringify(jsn[i].performance_summary_portInfo_totalServiceTimeMillis);
                var readTimeVal = JSON.stringify(jsn[i].performance_summary_portInfo_readServiceTimeMillis);
                var writeTimeVal = JSON.stringify(jsn[i].performance_summary_portInfo_writeServiceTimeMillis);
                var subArr = { serviceTime: serviceTimeVal, readTime: readTimeVal, writeTime: writeTimeVal };
                graph1.push(subArr);
            }

            //graph2
            for (i in jsn) {
                var rawVal = JSON.stringify(jsn[i].capacity_total_freeTiB);
                var ssdVal = JSON.stringify(jsn[i].capacity_byType_ssd_freeTiB);
                var tempDict = { raw: rawVal, ssd: ssdVal };
                graph2.push(tempDict);
            }

            //graph3
            var tempDict = {}
            for (i in jsn) {
                var country = JSON.stringify(jsn[i].location_country);
                if (tempDict[country] != undefined) {
                    tempDict[country] = tempDict[country] + 1;
                }
                else {
                    tempDict[country] = 1;
                }
            }
            for (var key in tempDict) {
                var littleDict = { country: key, count: tempDict[country] };
                graph3.push(littleDict);
            }

            //graph4
            for (i in jsn) {
                var countVal = JSON.stringify(jsn[i].disks_total_diskCount);
                var normalVal = JSON.stringify(jsn[i].disks_total_diskCountNormal);

                var tempDict = { count: countVal, normal: normalVal };
                graph3.push(tempDict)
            }

            global.g1 = graph1;
            global.g2 = graph2;
            global.g3 = graph3;
            global.g4 = graph4;

            topmost.navigate('home/home-page');

        }, function (error) {
            console.log("error");
            var t = topmost.navigate('home/home-page');
        })
    topmost.navigate('home/home-page');
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.generateGraphsAndNav = generateGraphsAndNav;

exports.loaded = function(args) {
    page = args.object;
};

exports.login = function() {
    email = page.getViewById('email');
    pword = page.getViewById('password');
    console.log(email.text)
    var topmost = frameModule.topmost();
    if (email.text == "gordon@umass.edu" && pword.text == "packers") {
        global.companyName = "Frenzy"
        global.queryStart = global.serverLink + "/systems/" + global.companyName
        generateGraphsAndNav()
        //topmost.navigate('home/home-page');
    }
    else if (email.text == "tim@umass.edu" && pword.text == "tim"){
        global.companyName = "Chaos"
        global.queryStart = global.serverLink + "/systems/" + global.companyName
        generateGraphsAndNav()
        //topmost.navigate('home/home-page');
    }
    else if (email.text == "" && pword.text == "") {
        global.companyName = "Frenzy"
        global.queryStart = global.serverLink + "/systems/" + global.companyName
        generateGraphsAndNav()
        //topmost.navigate('home/home-page');
    }
    else {
        alert({ title: "Invalid Credentials", message: "Incorrect Username or Password. Please try again.", okButtonText: "Close" });
    }
};