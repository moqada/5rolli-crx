import assert from 'power-assert';
import jsdom from 'jsdom';
/* eslint-disable */
const document = jsdom.jsdom('hello');
const window = document.defaultWindow;
/* eslint-enable */

describe('TimeSummaryManager', () => {
  let TimeSummaryManager = null;
  beforeEach(() => {
    TimeSummaryManager = require('../../src/content/TimeSummaryManager').default;
  });
  it('is defined', () => {
    assert(TimeSummaryManager);
  });
});
