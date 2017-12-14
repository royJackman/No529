const frameModule = require("ui/frame");
const LoginViewModel = require("./login-view-model");
var fetchModule = require("fetch");

var page;
var email;
var password;

function onNavigatingTo(args) {
    if (args.isBackNavigation) {
        return;
    }

    const page = args.object;
    page.bindingContext = new LoginViewModel();
}

function onDrawerButtonTap(args) {
    const sideDrawer = frameModule.topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

exports.login = function() {
  email = page.getViewById('email');
  pword = page.getViewById('password');

  var topmost = frameModule.topmost();
  fetchModule.fetch(global.serverLink, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: viewModel.get("email"),
      password: viewModel.get("password")
    })
  })
  .then(function(response) {
    var confirmation = response.json();
    if confirmation.status == 'valid' {
      global.companyName = confirmation.company;
      global.queryStart = global.serverLink + "/systems/" + global.companyName
      topmost.navigate('home/home-page');
    } else {
      alert({
        title: "Invalid Credentials",
        message: "Incorrect Username or Password. Please try again.",
        okButtonText: "Close"
      });
    }
  })
};

exports.loaded = function(args) {
    page = args.object;
};

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
