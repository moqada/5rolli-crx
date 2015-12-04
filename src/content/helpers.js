/**
 * Create time object from title text
 *
 * @param {string} title title text
 * @return {{spent: number, es50: number, es90: number}}
 */
export function createTime(title) {
  const matches = /\((?:(\d+)\/)?(\d+)\/(\d+)\)/.exec(title);
  if (!matches) {
    return {spent: 0, es50: 0, es90: 0};
  }
  const [spent, es50, es90] = matches.slice(1).map(s => {
    return s ? parseInt(s, 10) : 0;
  });
  return {spent, es50, es90};
}
