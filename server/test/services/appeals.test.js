const app = require('../../src/app');

describe('\'appeals\' service', () => {
  it('registered the service', () => {
    const service = app.service('appeals');
    expect(service).toBeTruthy();
  });
});
