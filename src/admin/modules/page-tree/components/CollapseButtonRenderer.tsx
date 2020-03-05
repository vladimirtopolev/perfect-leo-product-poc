import React from 'react';
import styles from './CollapseButtonRenderer.module.scss';
import {CollapseButtonRendererProps} from '../../../components/dnd-tree/themes/default/customizeNodeContentRenderer';

export default ({node, scaffoldBlockPxWidth, toggleChildrenVisibility, treeIndex, path, isDragging}: CollapseButtonRendererProps) => {
    let buttonStyle = {left: -0.5 * scaffoldBlockPxWidth};
    return (
        <div>
            <button
                type="button"
                aria-label={node.expanded ? 'Collapse' : 'Expand'}
                className={node.expanded ? styles.collapseButton : styles.expandButton}
                style={buttonStyle}
                onClick={() =>
                    toggleChildrenVisibility({
                        node,
                        path,
                        treeIndex,
                    })
                }
            >
            </button>

            {node.expanded && !isDragging && (
                <div
                    style={{width: scaffoldBlockPxWidth}}
                    className={styles.lineChildren}
                />
            )}
        </div>
    );
}
