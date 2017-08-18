angular.module('app')
.controller("VideoCtrl", [
  "$scope",
  "$sce",
  "UserMedia",
  function($scope, $sce, UserMedia) {
    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };

    $scope.captureVideo = function() {
      UserMedia.get().then(function(stream) {
        console.log("starting video", stream);
        window.stream = stream; // stream available to console for dev
        if (window.URL) {
          console.log("using window.URL");
          $scope.videostream = $sce.trustAsResourceUrl(
            window.URL.createObjectURL(stream)
          );
        } else {
          $scope.videostream = $sce.trustAsResourceUrl(stream);
        }
      });
    };
  }
]);
