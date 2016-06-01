var angularApp = angular.module('Football',['ngResource','ngRoute']);

angularApp.config(function ($routeProvider,$httpProvider){
  $httpProvider.defaults.headers.common['X-Auth-Token'] = 'e03b9e6e71734ae38c076a13eac738ea';
  $routeProvider
  .when('/',{
    templateUrl: 'pages/landing.html',
    controller: 'HomeController',
    controllerAs: 'dc'
  })
  .when('/leaguedetails/:uniqId/teams',{
    templateUrl:'pages/Leagues.html',
    controller: 'LeagueController',
    controllerAs:'lc'
  })
});

angularApp.controller("HomeController",['$resource','$http',function($resource,$http) {
  var vm = this;
  var details = $resource(' http://api.football-data.org/v1/soccerseasons/')
  vm.response = details.query();
  console.log(vm.response);
}]);

angularApp.controller("LeagueController",['$resource','$http','$routeParams',function($resource,$http,$routeParams){
  var vm=this;
  var id = $routeParams.uniqId;
  var details = $resource('http://api.football-data.org/v1/soccerseasons/'+ id +'/teams')
  vm.response = details.get();
  console.log(vm.response);
}]);
