Function.prototype.bindTo = function(scope) {
  var _function = this;
  return function() {
    return _function.apply(scope, arguments);
  }
}