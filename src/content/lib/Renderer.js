import mainLoop from 'main-loop';
import vdom from 'virtual-dom';

/**
 * @typedef {Object} RenderItem
 *
 * @property {DOMNode} node target DOMNode
 * @property {props} props props
 */


/**
 * Render
 */
export default class Renderer {

  /**
   * Constructor
   *
   * @param {Function} component virtual-dom Component Function
   */
  constructor(component) {
    this.nodes = [];
    this.component = component;
  }

  /**
   * Create virtual-dom tree and attach DOMNode
   *
   * @param {RenderItem} item item object
   * @return {{node: DOMNode, tree: Object}}
   */
  createTreeAndAttachDOM(item) {
    const tree = mainLoop(item.props, this.component, vdom);
    item.node.appendChild(tree.target);
    return {
      tree,
      parent: item.node
    };
  }

  /**
   * render
   *
   * @param {RenderItem[]} newItems render item list
   */
  render(newItems) {
    const oldNodes = this.nodes;
    const added = newItems.filter(ni => {
      return !(oldNodes.find(on => on.parent === ni.node));
    }).map(ni => this.createTreeAndAttachDOM(ni));
    const updated = oldNodes.map(on => {
      const updateItem = newItems.find(ni => ni.node === on.parent);
      if (!updateItem) {
        return null;
      }
      on.tree.update(updateItem.props);
      return on;
    }).filter(on => on);
    this.nodes = updated.concat(added);
  }
}
