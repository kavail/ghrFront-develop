angular
  .module('app')
  .component('fountainTech', {
    templateUrl: 'app/techs/tech.html',
    bindings: {
      tech: '<'
    },
    controller: function ($log) {
      $log.log('Saludos desde el controlador tech');
    }
  });
