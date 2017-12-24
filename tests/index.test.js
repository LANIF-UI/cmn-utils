const text = require('../src/index');

describe('common-api', () => {
  it('works', () => {
    const ret = text();
    expect(ret).toEqual("ok");
  });

});
