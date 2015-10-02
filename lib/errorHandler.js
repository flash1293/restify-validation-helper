var restify = require('restify');

var logger = require('./logger')();

module.exports = function(next) {
  return function(e) {
    if(typeof e === 'object' && e.statusCode) {
      //RestErrors are already handled and logged
      next(e);
    } else {
      logger.error(e.stack);
      next(new restify.errors.InternalServerError(e.toString()));
    }
  };
};
