var restify  = require('restify');
var util = require('util');

var logger = require('./loggerSubstitute')();

//inline-creation of errors
var ValidationFailedError = require('restify-error-helper').errorFactory(500, 'ValidationFailedError');
var ErroneousFieldsError = require('restify-error-helper').errorFactory(400, 'ErroneousFieldsError');

function errorStringBuilder(error) {
  if(error.path && error.message) {
    return error.path + ': ' + error.message;
  } else {
    return error.toString();
  }
}

module.exports = function(validatorFunction) {
  return function(req, res, next) {
    //handling for wrong usage
    if(typeof validatorFunction !== 'function') {
      var err = new ValidationFailedError('validator is not a function');
      logger.error(err.stack);
      next(err);
      return;
    }
    //handling of userinput-validation
    var errors = validatorFunction(req);
    if(util.isArray(errors)) {
      if(errors.length > 0) {
        var errorMessage = errors.map(errorStringBuilder).join(', ');
        logger.warn('error in payload/params: ' + errorMessage)
        next(new ErroneousFieldsError(errorMessage));
      } else {
        next();
      }
    } else {
      //handling of wrong usage
      var err = new ValidationFailedError('validator did not return array with wrong fields');
      logger.error(err.stack);
      next(err);
    }
  };
};
