angular
  .module('ghr.varios', [])
  .component('ghrTecnologias', {
    templateUrl: '../bower_components/component-varios/tecnologias.html',
    controller: formularioTecnologiaController
  })
  .constant('tecBaseUrl', 'http://localhost:3003/api/')
  .constant('tecEntidad', 'tecnologias')
  .factory('tecnologiasFactory', function crearTecnologias(toastr, $http, tecBaseUrl, tecEntidad) {
      // nombres y descripciones para crear las tecnologias con datos aleatorios
    // var nombres = ['java', 'javaScript', 'CSS', 'HTML', 'Angular', 'XML', 'C++', 'PHP', 'Pascal', 'Ajax', 'Assembly',
    //   'Scheme', 'Arduino', 'Python', 'Forth', 'Swift', 'Cuda', 'Delphi', '.NET', 'Cobol', 'Visual Basic', 'WebDNA', 'Groovy',
    //   'Smalltalk', 'Active Server Page', 'Scratch', 'Objective-C', 'TCL'];
    // var descripciones = ['muy usado', 'poco usado'];
    // var arrayTecnologias = [];
    // for (var i = 1; i < 200; i++) {
    //   arrayTecnologias.push(crearTecnologia(i));
    //     // enviamos la i como id de la tecnologia creada, llena el arrayTecnologias.
    // }
    // function _getReferenceById(id) {
    //   var tecnologia;
    //   for (i = 0; (i < arrayTecnologias.length) && (tecnologia == undefined); i++) {
    //     if (arrayTecnologias[i].id == id) {
    //       tecnologia = arrayTecnologias[i];
    //     }
    //   }
    //   return tecnologia;
    // }

    var serviceUrl = tecBaseUrl + tecEntidad;
    return {
        // sistema CRUD de tecnologias
      getAll: function getAll() {
        return $http({
          method: 'GET',
          url: serviceUrl
        }).then(function onSuccess(response) {
          return response.data;
        },
        function onFailure(reason) {
          toastr.error('No se ha podido realizar la operacion, por favor compruebe su conexion a internet e intentelo más tarde.', 'Error');
          deferred.reject(reason);
        });
      },

      create: function create(tecnologia) {
        return $http({
          method: 'POST',
          url: serviceUrl,
          data: tecnologia
        }).then(function onSuccess(response) {
          toastr.success('Creada correctamente!', tecnologia.nombre);
          return response.data;
        },
        function onFailirure(reason) {

        });
      },
      // create: function create(tecnologia) {
      //   console.log(tecnologia);
      //   tecnologia.id = arrayTecnologias.length + 1;
      //   arrayTecnologias.push(angular.copy(tecnologia));
      // },

        /**
         * [read description]
         * @method read
         * @param  {number} id id tecnologia
         * @return {tecno}    [description]
         */

      read: function read(id) {
        return $http({
          method: 'GET',
          url: serviceUrl + '/' + id
        }).then(function onSuccess(response) {
          return response.data;
        });
        return angular.copy(_getReferenceById(id));
      },

      // read: function read(id) {
      //   return angular.copy(_getReferenceById(id));
      // },

      // UTILIZAR PATCH

      update: function update(tecnologia) {
        console.log(tecnologia);
        return $http({
          method: 'PATCH',
          url: serviceUrl + '/' + tecnologia.id,
          data: tecnologia
        }).then(function onSuccess(response) {
          toastr.success('Actualizado correctamente!', tecnologia.nombre);
          return response.data;
        },
          function onFailure(reason) {
            toastr.error('No se ha podido realizar la operacion, por favor compruebe su conexion a internet e intentelo más tarde.', 'Error');
            deferred.reject(reason);
          });
      },
      //
      // update: function update(tecnologia) {
      //   if (!tecnologia.id) {
      //     console.log(tecnologia);
      //     throw 'el objeto carece de id y no se actualiza' + JSON.stringify(tecnologia);
      //   }
      //   oldTecno = _getReferenceById(tecnologia.id);
      //   if (oldTecno) {
      //     var indice = arrayTecnologias.indexOf(oldTecno);
      //     var newTecno = arrayTecnologias[indice] = angular.copy(tecnologia);
      //     return angular.copy(newTecno);
      //   }
      //   throw 'el objeto carece de id y no se actualiza ' + JSON.stringify(tecnologia);
      // },

      delete: function _delete(selectedItem) {
        return $http({
          method: 'DELETE',
          url: serviceUrl + '/' + selectedItem
        });
      }
      // delete: function _delete(tecnologia) {
      //   if (!tecnologia.id) {
      //     throw 'el objeto carece de id y no se borra' + JSON.stringify(tecnologia);
      //   }
      //   oldTecno = _getReferenceById(tecnologia.id);
      //   if (oldTecno) {
      //     var indice = arrayTecnologias.indexOf(oldTecno);
      //     if (indice > -1) {
      //       arrayTecnologias.splice(indice, 1);
      //     } else {
      //       throw 'el objeto carece de id y no se borra' + JSON.stringify(tecnologia);
      //     }
      //   }
      // }

    };
    // creacion de un objeto tecnologia
    function crearTecnologia(i) {
      tecnologia = {
        id: i,
        nombre: obtenerValor(nombres),
        descripcion: obtenerValor(descripciones)
      };
      return tecnologia;
    }
    // numero aleatorio para seleccionar un nombre y una descripcion de sus arrays.
    function aleatorio(rango) {
      return Math.floor(Math.random() * rango);
    }
    function obtenerValor(array) {
      return array[aleatorio(array.length)];
    }
  })
  .component('ghrTecnologiasList', {
    templateUrl: '../bower_components/component-varios/tecnologia.html',
    controller: generarTecnologias
  })
  .component('eliminarTecnologiaModal', {
    templateUrl: '../bower_components/component-varios/eliminadoTecnologiaModal.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: function () {
      var vm = this;
      vm.$onInit = function () {
        vm.selected = vm.resolve.seleccionado;
      };
      vm.ok = function (seleccionado) {
        vm.close({
          $value: seleccionado
        });
      };
      vm.cancel = function () {
        vm.dismiss({
          $value: 'cancel'
        });
      };
    }
  });
function formularioTecnologiaController(toastr, $stateParams, tecnologiasFactory, $state) {
  const vm = this;// Imprime por pantalla $stateParams
  vm.mode = $stateParams.mode;
  vm.edit = function () {
    $state.go($state.current,
      {
        mode: 'edit'
      });
    vm.mode = $stateParams.mode;
  };
  vm.noEdit = function () {
    $state.go($state.current,
      {
        mode: 'view'
      });
  };
  vm.update = function (user) {
  //   var x = (tecnologiasFactory.getAll().length)+1;
  //   console.log('ultimo objeto:' + tecnologia.id+'=' + = (tecnologiasFactory.getAll().length)+1;);
  //   console.log('longitudad del array:'+ tecnologiasFactory.getAll().length);
    if ($stateParams.id == 0) {
      console.log('creando nueva tecnologia');
      delete $stateParams.id;
      tecnologiasFactory.create(vm.tecnologia).then(function (tecnologia) {
        $state.go($state.current, {
          id: tecnologia.id,
          mode: 'view'
        });
        // toastr.success('Tecnologia creada!', 'correctamente!');
      });
    } else if (vm.form.$dirty === true) {
      tecnologiasFactory.update(vm.tecnologia).then(function (tecnologia) {

      });
      console.log('actualizando tecnologia');
    } else {
      toastr.info('no ha habido cambios', 'Informacion');
    }
  };

  vm.reset = function (form) {
    vm.tecnologia = angular.copy(vm.original);
  };
  if ($stateParams.id != 0) {
    vm.original = tecnologiasFactory.read($stateParams.id).then(
        function (tecnologia) {
          vm.tecnologia = tecnologia;
        }
      );
  }

  // vm.reset();
  //
  // if ($stateParams != 0) {
  //   tecnologiasFactory.read($stateParams.id).then(
  //     function (tecnologia) {
  //       vm.original = vm.tecnologia = tecnologia;
  //     });
  // }
}

function generarTecnologias(toastr, tecnologiasFactory, $uibModal, $log, $document) {
  const vm = this;
  tecnologiasFactory.getAll().then(function onSuccess(response) {
    vm.arrayTecnologias = response;
    vm.tecnologia = vm.arrayTecnologias;
  });

  vm.currentPage = 1;
  vm.setPage = function (pageNo) {
    vm.currentPage = pageNo;
  };

  vm.maxSize = 10;  // Elementos mostrados por página
  vm.open = function (id, nombre) {
    var modalInstance = $uibModal.open({
      component: 'eliminarTecnologiaModal',
      resolve: {
        seleccionado: function () {
          return id;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      console.log('selectedItem -->' + selectedItem);
      vm.arrayTecnologias = tecnologiasFactory.getAll();
      tecnologiasFactory.delete(selectedItem).then(function () {
        toastr.success('elimanda correctamente');
        tecnologiasFactory.getAll().then(function (tecnologias) {
          vm.arrayTecnologias = tecnologias;
        });
      });
    });
  };
}
