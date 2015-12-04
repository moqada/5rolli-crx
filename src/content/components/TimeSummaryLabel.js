import h from 'virtual-dom/h';
import nbem from 'nbem';


/**
 * Estimate Label Node
 *
 * @param {TimeSummary} timeSummary timeSummary object
 * @param {Function} bem nbem factory function
 * @return {Element[]}
 */
function estimateLabel(timeSummary, bem) {
  return ['es', null, 'es50', null, 'es90'].map(key => {
    const className = key ? '' : `${bem('&&separator')}`;
    const val = key ? timeSummary[key] || 0 : ' | ';
    return h('span', {className}, val);
  });
}


/**
 * TimeSummaryLabel Component
 *
 * @param {{timeSummary: TimeSummary}} state state
 * @return {Element}
 */
export default function TimeSummaryLabel(state) {
  const {timeSummary} = state;
  const bem = nbem();
  return h(`.${bem('crx5rolli-timeSummaryLabel')}`, [
    h(`.${bem('&&spent')}`, [
      timeSummary.spent
    ]),
    h(`.${bem('&&es')}`, estimateLabel(timeSummary, bem))
  ]);
}
