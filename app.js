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

  .when('/leaguedetails/teams/players',{
    templateUrl:'pages/players.html',
    controller: 'PlayersController',
    controllerAs:'plc'
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
  // console.log(vm.teamImage);
  // if(id !== undefined){
      vm.details = TeamService.getteams(id);
      console.log(vm.details);
  // }
  // vm.teamPlayers = function(data, img){
  //   $location.url('/leaguedetails/teams/players');
  //     var details =  $resource(data);
  //     vm.response = details.get();
  //     console.log(vm.response);
  //     vm.teamImage = img;
  //   }
}]);

angularApp.controller('PlayersController',['$resource','$location','TeamService',function($resource,$location,TeamService){
  // vm.teamPlayers = function(data){
  //   var vm = this;
  //   vm.details = TeamService.getplayers(data);
  // }
  var vm =this;
  vm.teamPlayers = function(data){
    $location.url('/leaguedetails/teams/players');
    console.log(data);
      vm.details = TeamService.getplayers(data);
      console.log(vm.details);
    }

}])










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

                                //  ----------------service-------------------



angularApp.service('TeamService',function($resource){
  var vm =this;
      vm.getteams = function(id){
      var details = $resource('http://api.football-data.org/v1/soccerseasons/'+ id +'/teams')
      vm.response = details.get();
      return vm.response;
      console.log(vm.response);
      }

      vm.getplayers = function(data){
          var playerdetails =  $resource(data);
          vm.playerresponse = details.get();
          return vm.playerresponse;
          console.log(vm.playerresponse);
      }
});
