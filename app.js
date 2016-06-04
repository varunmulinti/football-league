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
    templateUrl:'pages/teams.html',
    controller: 'LeagueController',
    controllerAs:'lc'
  })
  .when('/leaguedetails/:uniqId/fixtures',{
    templateUrl:'pages/legfix.html',
    controller:'FixtureController',
    controllerAs:'fc'
  })
  .when('/leaguedetails/:uniqId/leaguepoints',{
    templateUrl:'pages/points.html',
    controller:'PointsController',
    controllerAs:'pc'
  })
  .when('/leaguedetails/team/playerDetails',{
    templateUrl:'pages/players.html',
    controller:'PlayerController',
    controllerAs:'plc'
  })
  .when('/leaguedetails/team/teamFixtures',{
    templateUrl:'pages/teamfix.html',
    controller:'TeamfixController',
    controllerAs:'tf'
  })
  .otherwise({ redirectTo: '/' });
});
                                    //  --------------controller-------------------------



angularApp.controller("HomeController",['$resource',function($resource) {
  var vm = this;
  var details = $resource(' http://api.football-data.org/v1/soccerseasons/')
  vm.response = details.query();
  console.log(vm.response);
}]);

angularApp.controller("LeagueController",['$resource','$routeParams','TeamService','$location',function($resource,$routeParams,TeamService,$location){
  var vm=this;
  var id = $routeParams.uniqId;
      vm.details = TeamService.getteams(id);
      console.log(vm.details);
      vm.teamPlayers = function(url,img,name,code){
        TeamService.api = url;
        TeamService.img = img;
        TeamService.teamname = name;
        TeamService.teamcode = code;
        $location.url('/leaguedetails/team/playerDetails');
      }
     vm.teamFixtures = function(url,img,name,code){
        TeamService.api = url;
        TeamService.img = img;
        TeamService.teamname = name;
        TeamService.teamcode = code;
        $location.url('/leaguedetails/team/teamFixtures')
      }

}]);

angularApp.controller("FixtureController",['$resource','$routeParams',function($resource,$routeParams){
  var vm = this;
  var id = $routeParams.uniqId;
  var details = $resource('http://api.football-data.org/v1/soccerseasons/'+ id +'/fixtures')
  vm.response = details.get();
  console.log(vm.response);
}]);

angularApp.controller("PointsController",['$resource','$routeParams',function($resource,$routeParams){
  var vm = this;
  var id = $routeParams.uniqId;
  var details = $resource('http://api.football-data.org/v1/soccerseasons/'+ id +'/leagueTable')
  vm.response = details.get();
  console.log(vm.response);
}]);

angularApp.controller("PlayerController",['$resource','$routeParams','TeamService',function($resource,$routeParams,TeamService){
  var vm = this;
  vm.image = TeamService.img;
  vm.teamname = TeamService.teamname;
  vm.teamcode = TeamService.teamcode;
  var playerUrl = TeamService.api;
  var data = $resource(playerUrl);
  vm.playersDetail = data.get();
  console.log(vm.playersDetail);
}])

angularApp.controller("TeamfixController",['$resource','$routeParams','TeamService',function($resource,$routeParams,TeamService){
  var vm = this;
  vm.image = TeamService.img;
  vm.teamname = TeamService.teamname;
  vm.teamcode = TeamService.teamcode;
  var fixUrl = TeamService.api;
  var data = $resource(fixUrl);
  vm.fixdata = data.get();
  console.log(vm.fixdata);
}])







                                //  ----------------service-------------------



angularApp.service('TeamService',function($resource,$routeParams){
  var vm =this;
  vm.api = "";
  vm.img = "";
  vm.teamname = "";
  vm.teamcode = "";
      vm.getteams = function(id){
      var details = $resource('http://api.football-data.org/v1/soccerseasons/'+ id +'/teams')
      vm.response = details.get();
      return vm.response;
      console.log(vm.response);
      }
  });
