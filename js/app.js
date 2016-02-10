angular.module('projectorize', ['hc.marked'])

.config(['markedProvider', function (markedProvider) {
  markedProvider.setOptions({gfm: true});
}]);