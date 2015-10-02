//the default logger is the console
var loggerInstance = console;

module.exports = function(externalLogger) {
  if(externalLogger) {
    loggerInstance = externalLogger;
  }
  return loggerInstance;
};