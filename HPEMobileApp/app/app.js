require("./bundle-config");
require("data/observable");
const application = require("application");

global.serverLink = "https://hpbackend.localtunnel.me"

application.start({ moduleName: "login/login" });



/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
