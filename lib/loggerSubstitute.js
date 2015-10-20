//the default logger is the console
var loggerInstance = console;

module.exports = function(externalLogger) {
  if(externalLogger) {
    loggerInstance = externalLogger;
    require('restify-error-helper').logger(externalLogger);
  }
  return loggerInstance;
};
