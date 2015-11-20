
var app = angular.module('atjy', ['ngMaterial', 'ngRoute', 'angular-inview', 'duScroll']);

app.config(['$mdThemingProvider', '$routeProvider', function ($mdThemingProvider, $routeProvider) {
        $mdThemingProvider.theme('default')
        .primaryPalette('grey')
        .accentPalette('pink');
        
}])

app.controller('indexCtrl', ['$scope', '$mdDialog', '$route','$timeout', '$document' , function($scope, $mdDialog, $route, $timeout, $document){
        // $scope.test = 'test';

        $scope.test = function(a, b, c, d){
                console.log(a);
        }

        $scope.checkState = function(route, inviewPart){
                if(inviewPart === 'top'){
                        $scope.state = route;
                        // window.location.hash = route;
                }
        };


        $scope.$on('$locationChangeStart', function(next, current) { 
                        // console.log(current);
                        if(current === undefined){
                                return;
                        }
                        var route = current.split('#/')[1];
                        $scope.routeTo(route);
        });



        $scope.routeTo = function(route){
                var attrs = angular.element(document.getElementById(route))[0].attributes;
                console.log(route);
                for(var i = 0; i < attrs.length; i++){
                        if(attrs[i].nodeName == 'scroll-position'){
                                var pos = Number(attrs[i].nodeValue) - 70;
                                $document.scrollTop(pos, 300).then(function() {
                                        console && console.log('You just scrolled to the top!');
                                });
                        }
                }

                $scope.state = route;
        }

        $scope.aboutDialog = function(about, e){
                console.log(about);
                var parentEl = angular.element(document.body);
                $mdDialog.show({
                        parent: parentEl,
                        targetEvent: e,
                        template:
                                '<md-dialog aria-label="List dialog">' +
                                '  <md-dialog-content>'+
                                '    Amanda skills '+about +
                                '  </md-dialog-content>' +
                                '</md-dialog>',
                });
        };

}]);

app.directive('scrollPosition', [function () {
        return {
                restrict: 'A',
                link: function (scope, iElement, iAttrs) {
                                iElement.removeAttr('scroll-position');
                                iElement.attr('scroll-position', iElement[0].offsetTop);
                }
        };
}])