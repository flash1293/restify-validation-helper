var restify = require('restify');

var logger = require('./logger')();

//this is the base-error-handler, if an error is raised outside of a promise-chain in a handler or middleware
module.exports = function(req, res, route, e) {
  logger.error(e.stack);
  res.send(new restify.errors.InternalServerError(e.toString()));
}
