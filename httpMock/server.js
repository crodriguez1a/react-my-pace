//Dev devDependencies
var bodyParser = require('http-body-parse');

//Mocks
var mocks = [
  '/foo'
];

//Server
module.exports = {
  onCreateServer: function(server, connect, options) {
    //
  },
  middleware: function(connect, options, middlewares) {
    if (mocks.length) {
      middlewares.unshift(function(req, res, next) {
        
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
