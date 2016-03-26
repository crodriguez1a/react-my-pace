//Dev devDependencies
var bodyParser = require('http-body-parse');

//Mocks
var mocks = [
  '/auto/online-services/access/pre-login.html',
  '/auto/online-services/access/getSavedUsername.html',
  'https://securebanking-dev1.ally.com/IDPProxy/executor/authenticate',
  '/mock/bank/authenticate'
];

var redirects = [
  '/sites/ally-online-banking/assets/storage/storage.swf'
];

//Server
module.exports = {
  onCreateServer: function(server, connect, options) {
    //
  },
  middleware: function(connect, options, middlewares) {
    if (mocks.length) {
      middlewares.unshift(function(req, res, next) {

        //redirects
        //if (redirects.indexOf(req.url) >= 0) {
          //TODO: redirect file paths
        //}

        //mock proxies
        if (mocks.indexOf(req.url) >= 0) {
          bodyParser(req)
          .then(function(fields) {
            res.end(JSON.stringify({
              body    : fields,
              status  : 200,
              method  : req.method,
              headers : req.headers
            }));
            return next();
          });

        } else {
          return next();
        }
      });
    }
    return middlewares;
  }
}
