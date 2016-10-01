'use strict';

describe('Controller: AdminlsaCtrl', function () {

  // load the controller's module
  beforeEach(module('lsamapApp'));

  var AdminlsaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminlsaCtrl = $controller('AdminlsaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminlsaCtrl.awesomeThings.length).toBe(3);
  });
});
