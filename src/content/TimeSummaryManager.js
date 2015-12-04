import summarizer from '5rolli-time-summarizer';
import TimeSummaryLabel from './components/TimeSummaryLabel';
import Renderer from './lib/Renderer';
import {createTime} from './helpers';

/**
 * @typedef {Object} TimeSummary
 *
 * @property {number} es estimated minutes
 * @property {number} es50 50% estimated minutes
 * @property {number} es90 90% estimated minutes
 * @property {number} spent spent minutes
 */


/**
 * Managemnet TimeSummary on Trello Web Site
 */
export default class TimeSummaryManager {
  /**
   * Constructor
   *
   * @param {DOMNode} targetDOM target DOM for observing
   */
  constructor(targetDOM) {
    this.target = targetDOM;
    this.renderer = new Renderer(TimeSummaryLabel);
    this.observer = new MutationObserver(mutations => {
      mutations.every(mutation => {
        const {target, addedNodes, removedNodes} = mutation;
        const added = addedNodes.length ? addedNodes[0].classList : null;
        const removed = removedNodes.length ? removedNodes[0].classList : null;
        const hasChange = (
          target.classList.contains('list-card-title')
          || added && added.contains('list-card')
          || removed && removed.contains('list-card')
        );
        if (hasChange) {
          this.refresh();
          return false;
        }
        return true;
      });
    });
  }

  /**
   * Start Observe Trello and attach TimeSummary labels
   */
  start() {
    this.refresh();
    this.observer.observe(this.target, {childList: true, subtree: true});
  }

  /**
   * Refresh all TimeSummary labels
   */
  refresh() {
    const renderItems = this.getTimeSummaries();
    this.renderer.render(renderItems);
  }

  /**
   * Return TimeSummary and DOMNode per Trello List
   *
   * @return {{node: DOMNode, props: {timeSummary: TimeSummary}}}
   */
  getTimeSummaries() {
    const listNodes = this.target.querySelectorAll('.list-wrapper > .list');
    return Array.prototype.map.call(listNodes, listNode => {
      const titleNodes = listNode.querySelectorAll('.list-card-title');
      const times = Array.prototype.map.call(titleNodes, title => {
        if (title.offsetParent) {
          return createTime(title.text);
        }
        return null;
      }).filter(t => t);
      const timeSummary = summarizer(times);
      return {
        node: listNode.querySelector('.list-header'),
        props: {timeSummary}
      };
    });
  }
}
