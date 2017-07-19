angular
  .module('app')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', routesConfig]);

function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');
  $urlRouterProvider.when('/', '/dashboard');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'app'
    })
    .state('app.solicitudesDashboard', {
      url: 'dashboard',
      template: [
        '<fountain-title></fountain-title>',
        '<ghr-solicitudes-dashboard>Loading..</ghr-solicitudes-dashboard>'
      ],
      controller: function ($log) {
        $log.log('');
      }
    })
    .state('app.candidatos', {
      url: 'candidatos',
      template: '<ghr-candidatos-list>Loading..</ghr-candidatos-list>',
      controller: function ($log) {
        $log.log('');
      }
    })
    .state('app.candidatos-perfil', {
      url: 'candidatos/:id',
      params: {
        mode: 'view'
      },
      template: '<ghr-candidatos>Loading..</ghr-candidatos>',
      controller: function ($log, $stateParams) {
        $log.log('');
      }
    })
    .state('app.caracteristicas', {
      url: 'caracteristicas',
      template: '<ghr-caracteristicas-list>Loading..</ghr-caracteristicas-list>',
      controller: function ($log) {
        $log.log('');
      }
    })
    .state('app.caracteristicasDetalle', {
      url: 'caracteristicas/:id/',
      params: {
        mode: 'view'
      },
      controller: function ($stateParams) {},
      template: '<ghr-caracteristicas>Loading..</ghr-caracteristicas>'
    })
    .state('app.solicitudes', {
      url: 'solicitudes',
      template: '<ghr-solicitudes-list>Loading..</ghr-solicitudes-list>',
      params: {
        mode: 'view'
      },
      controller: function ($log) {
        $log.log('');
      }
    })
    .state('app.solicitudesForm', {
      url: 'solicitudes/:id',
      template: '<ghr-solicitudes-form>Loading..</ghr-solicitudes-form>',
      params: {
        mode: 'view'
      },
      controller: function ($log, $stateParams) {
        $log.log($stateParams.id);
        angular.isDefined($stateParams.id);
      }
    });
}
