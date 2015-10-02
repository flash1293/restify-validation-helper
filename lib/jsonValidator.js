var restify = require('restify');
var MissingBodyError = require('../errors/missingBody');
var logger = require('./logger');

//inline-creation of errors
var MissingBodyError = require('./errorFactory')(400, 'MissingBodyError');

module.exports = function(req, res, next) {
  if(req.header('Content-Type') !== 'application/json') {
    logger.warn('sent request which is not application/json');
    next(new restify.errors.NotAcceptableError('only application/json payload is acceptable'));
  } else if(!req.body) {
    logger.warn('sent request which is application/json, but doesn\'t have a valid json-body');
    next(new MissingBodyError('The request has to have a json-body'));
  } else {
    next();
  }
};
