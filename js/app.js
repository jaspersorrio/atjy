
var app = angular.module('atjy', ['ngMaterial', 'ngRoute', 'angular-inview', 'duScroll']);

app.config(['$mdThemingProvider', '$routeProvider', function ($mdThemingProvider, $routeProvider) {
        $mdThemingProvider.theme('default')
        .primaryPalette('grey')
        .accentPalette('pink');
        
}])

app.run(['$window', function($window) {
        $window.onload = function() {
                console.log("window has been loaded");
                skrollr.init();
                app.directive('skrollr', function () {
                        var obj = {
                                link: function () {
                                        /* jshint ignore:start */
                                        console.log(skrollr);
                                        console.log("Done refreshing skrollr");
                                        skrollr.init().refresh();
                                        /* jshint ignore:end */
                                }
                        };
                        return obj;
                });
        };
}])

app.controller('indexCtrl', ['$scope', '$mdDialog', '$route','$timeout', '$document', '$sce', function($scope, $mdDialog, $route, $timeout, $document, $sce){
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
//                 var aboutAttr = angular.element(document.getElementById('about'))[0].attributes
//                 console.log(angular.element(document.getElementById('about')));
//                 for(var i = 0; i < aboutAttr.length; i++){
//                         if(aboutAttr[i].nodeName == 'scroll-position'){
//                                 var margin = (aboutAttr[i].nodeValue * 0.15);
//                         }
//                 }

// offsetHeight

                // scaling doesn't only happen in x position, 
                // it happens in both x and y position 
                var elem = angular.element(document.getElementById(route))[0];
                var attrElem = elem.attributes;
                var heightElem = elem.offsetHeight;
                console.log(route);
                for(var i = 0; i < attrElem.length; i++){
                        if(attrElem[i].nodeName == 'scroll-position'){
                                console.log(attrElem[i].nodeValue);
                                // - (heightElem * 0.15) + 32
                                var pos = Number(attrElem[i].nodeValue) ;
                                $document.scrollTop(pos, 300).then(function() {
                                        console && console.log('You just scrolled to the top!');
                                });
                        }
                }

                $scope.state = route;
        }

        $scope.openDialog = function($event, story){
                var newStory = angular.copy(story);
                newStory.description = $sce.trustAsHtml(newStory.description);
                var parentEl = angular.element(document.body)
                $mdDialog.show({
                        clickOutsideToClose: true,
                        escapeToClose: true,
                        parent: parentEl,
                        targetEvent: $event,
                        disableParentScroll: true,
                        controller: ["$scope",function($scope){
                                $scope.story = newStory;
                        }],
                        templateUrl : "dialog/scholarship.html"
                })
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

        $scope.stories ={
                stag:{
                        title : "Mid-Autumn Festival at Stag Match Tuition Centre",
                        description: "<p>Stag Match is one of the few tuition centres in Singapore that provides free tuition classes for the kids from lower-income families. In September this year, a group of my friends and I actually had the chance to celebrate Mid-Autumn Festival with the kids there.</p><p>We spent an evening together with the kids where we got them to decorate their own lanterns and pencil cases for them to bring home. Other than that, every kid was also given a Mac Donalds’ meal each for their dinner which they enjoyed incredibly!</p><p>Seeing the kids enjoying themselves made me really happy as well! The time seemed to have passed really fast when I was with them. I love the presence of kids and they never fail to remind me to enjoy the little things in life!</p>",
                        img:"../images/stagTuition.jpg"
                },
                nyc:{
                        title : "YEP Chiang Mai",
                        description: "<p>Just in March this year, a group of my schoolmates and I had the opportunity to visit one of the rural parts of Chiang Mai.  We spent almost two weeks there where we helped out with the refurbishment of the child care in the village which includes building of toilets and extensions of classrooms. In addition to the construction works, we also had the chance to interact with the kids in the village where we conducted a few English lessons for them!</p><p>The 2 weeks spent there was an extremely draining one, but the experience I got in return was definitely unmeasurable. It has truly opened my eyes to the other part of the world. My greatest takeaway of this trip would definitely be the spirit of the villagers there. Even though many of them did not have much for themselves, they were still very contented and happy with the life they had. Despite of their tight financials, many of the villagers there would still generously offer us the food they had. Truly, the happiest people do not necessarily have the best of everything, they just make the best of everything they have!</p>",
                        img:"../images/nyc.jpg"
                },
                ahuva:{
                        title : "Salad Making Workshop at Good Shepherd Centre",
                        description: "<p>Good Shepherd Centre is a crisis shelter where teenagers, women, mothers and their children as well as foreign domestic workers can rebuild their lives after violence, abuse and victimization.</p><p>A group of friends and I actually had the rare opportunity to volunteer at the centre as it usually does not allow any people to enter the premises to protect the privacy of the residents there.</p><p>We spent our Saturday morning at the centre, interacting with the kids there. Other than that, we also conducted a salad making workshop for them where we taught them how to make a simple salad and emphasized the importance of healthy living to them!</p><p>Most of these kids came from complicated family backgrounds. Their parents either left them or no longer have the ability to take care of them, so they had to be send to the centre where the organisation will take care of them until they grow up.</p><p>The visit to the centre made me realize how fortunate I am to be able to have my family with me by my side, supporting me in whatever I do. I never realize what a great blessing it is, until I saw the kids who do not have their parents with them even at such a young age. Through the interaction with the kids, I also learnt that even though they may not have their parents there to love them, we can be the one loving them! Afterall, how much does loving others cost? It is free.</p>",
                        img:"../images/ahuva.jpg"
                },
                runForFood:{
                        title : "Run for Food Distribution Drive",
                        description: "<p>Run for Food Distribution Drive is an event organised by NP Food Aid Club where we helped to distribute daily necessities to the people who are struggling with their financials.</p><p>On the day of the event, we actually went door-to-door to distribute the bag of daily essentials which includes rice, oil,salt and milo packets, to the residents. It was my first time participating in a distribution drive then.</p><p>Throughout the event, I got to interact with many residents. They actually shared with me about the circumstances that they were in, the helplessness they felt given their financial situations. Many of them were also relying on government social support as they could not work due to their illnesses. It was definitely heart-wrenching to hear them sharing all these to me.</p><p>Through the interactions with these residents, I began to learn that although Singapore is a well-developed country, there are still a minority of people who are suffering behind the closed door which not many of us know of. How great would Singapore become if the rich could help the poor?</p>",
                        img:"../images/runforfood.jpg"
                },
                scholarship:{
                        title:"Ngee Ann Polytechnic Scholarship for Academic Year 14/15 & 15/16",
                        description:"<p>One of the greatest achievements in my life is probably being able to receive the Ngee Ann Scholarship Award for the past two consecutive years. I am truly humbled by the recognition given to me. It was something I never thought I could achieve because I felt that I was just a very ordinary student in school.</p><p>This award has definitely spurred me to give my best in all that I do, be it in or out of class. I am  deeply thankful for the many opportunities that this award has offered me. I got to participate in many programmes such as The Christieara Summit, Polytechnic Forum, Mentoring Session etc.</p><p>All these programmes has certainly allowed me to understand so much more about myself and the world I am living in. Beyond that, it has also prepared me to be ready for my further education in the university!</p><p>But above all these achievements, it is also a testimony to show how God is able make the impossible possible if you have faith in Him!</p>",
                        img:"../images/Scholarship-2015-2.jpg"      
                }
        }

}]);

app.directive('scrollPosition', [function () {
        return {
                restrict: 'A',
                link: function (scope, iElement, iAttrs) {
                                iElement.removeAttr('scroll-position');
                                console.log(iElement[0].offsetTop);
                                iElement.attr('scroll-position', iElement[0].offsetTop);
                }
        };
}])