var restify = require('restify');
var util = require('util');

module.exports = function(statusCode, name) {
  function CreatedError(message) {
    restify.RestError.call(this, {
      restCode: name,
      statusCode: statusCode,
      message: message,
      constructorOpt: CreatedError
    });
    this.name = name;
  }
  util.inherits(CreatedError, restify.RestError);
  
  return CreatedError;
};