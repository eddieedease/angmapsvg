'use strict';

describe('Service: ipa', function () {

  // load the service's module
  beforeEach(module('lsamapApp'));

  // instantiate service
  var ipa;
  beforeEach(inject(function (_ipa_) {
    ipa = _ipa_;
  }));

  it('should do something', function () {
    expect(!!ipa).toBe(true);
  });

});
