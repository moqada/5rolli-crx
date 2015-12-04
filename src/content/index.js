import TimeSummaryManager from './TimeSummaryManager';

/**
 * Initialize
 */
(() => {
  const manager = new TimeSummaryManager(document.body);
  manager.start();
})();
