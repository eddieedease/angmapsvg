'use strict';

describe('Controller: MinadCtrl', function () {

  // load the controller's module
  beforeEach(module('lsamapApp'));

  var MinadCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MinadCtrl = $controller('MinadCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MinadCtrl.awesomeThings.length).toBe(3);
  });
});
