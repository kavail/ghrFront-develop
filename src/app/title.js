angular
  .module('app')
  .component('fountainTitle', {
    templateUrl: 'app/title.html',
    controller: controladorTitulo
  });

function controladorTitulo($document, $timeout, $sessionStorage) {
  var vm = this;

  if ($sessionStorage.verTitulo !== false) {
    vm.ver = true;
  /* eslint angular/timeout-service: 2 */
    $timeout(function () {
      vm.ver = false;
      $sessionStorage.verTitulo = vm.ver;
    }, 2000);
  }
}
