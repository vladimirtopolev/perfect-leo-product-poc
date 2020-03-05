import React, {Component} from 'react';
import cn from 'classnames';

import nodeContentRendererDefault from './components/NodeContentRenderer';
import collapseButtonRendererDefault from './components/CollapseButtonRenderer';
import dragSourceRendererDefault from './components/DragSourceRenderer';


import styles from './NodeContentRenderer.module.scss';
import {NodeData, NodeRendererProps, TreeItem} from 'react-sortable-tree';

export type CollapseButtonRendererProps = {
    node: TreeItem,
    toggleChildrenVisibility(data: NodeData): void,
    path: Array<string | number>,
    treeIndex: number,
    isDragging: boolean,
    scaffoldBlockPxWidth: number
}

export type NodeContentRendererProps = {
    node: TreeItem,
    path: Array<string | number>,
    treeIndex: number,
    treeId: string
}

export type DragSourceRendererProps = {
    node: TreeItem,
    toggleChildrenVisibility?(data: NodeData): void,
    path: Array<string | number>,
    treeIndex: number
}


export default ({specificNodeContentRenderer,specificCollapseButtonRenderer, specificDragSourceRenderer}:
                    {
                        specificNodeContentRenderer?: (props: NodeContentRendererProps) => JSX.Element,
                        specificCollapseButtonRenderer?: (props: CollapseButtonRendererProps) => JSX.Element,
                        specificDragSourceRenderer?: (props: DragSourceRendererProps) => JSX.Element
                    }) => {

    class NodeRendererDefault extends Component<NodeRendererProps> {
        render() {
            const {
                scaffoldBlockPxWidth,
                toggleChildrenVisibility,
                connectDragPreview,
                connectDragSource,
                isDragging,
                canDrop,
                canDrag,
                node,
                title,
                subtitle,
                draggedNode,
                path,
                treeIndex,
                isSearchMatch,
                isSearchFocus,
                buttons,
                className,
                style,
                didDrop,
                treeId,
                isOver, // Not needed, but preserved for other renderers
                parentNode, // Needed for dndManager
                rowDirection,
                ...otherProps
            } = this.props;

            const nodeContentRenderer = specificNodeContentRenderer || nodeContentRendererDefault;
            const collapseButtonRenderer = specificCollapseButtonRenderer || collapseButtonRendererDefault;
            const dragSourceRenderer = specificDragSourceRenderer || dragSourceRendererDefault;

            let handle;
            if (canDrag) {
                if (typeof node.children === 'function' && node.expanded) {
                    // Show a loading symbol on the handle when the children are expanded
                    //  and yet still defined by a function (a callback to fetch the children)
                    handle = (
                        <div className={styles.loadingHandle}>
                            <div className={styles.loadingCircle}>
                                {[...new Array(12)].map((_, index) => (
                                    <div key={index}
                                         className={styles.loadingCirclePoint}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                } else {
                    // Show the handle used to initiate a drag-and-drop
                    handle = connectDragSource(
                        dragSourceRenderer({node, toggleChildrenVisibility, path, treeIndex}),
                        {
                            dropEffect: 'copy',
                        });
                }
            }

            const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
            const isLandingPadActive = !didDrop && isDragging;

            return (
                <div style={{height: '100%'}} {...otherProps}>
                    {toggleChildrenVisibility && node.children
                    && (node.children.length > 0 || typeof node.children === 'function')
                    && collapseButtonRenderer({
                        node, toggleChildrenVisibility, path, treeIndex, isDragging, scaffoldBlockPxWidth
                    })}

                    <div className={styles.rowWrapper}>
                        {/* Set the row preview to be used during drag and drop */}
                        {connectDragPreview(
                            <div className={cn(
                                styles.row,
                                isLandingPadActive && styles.rowLandingPad,
                                isLandingPadActive && !canDrop && styles.rowCancelPad,
                                isSearchMatch && styles.rowSearchMatch,
                                isSearchFocus && styles.rowSearchFocus,
                                className
                            )}
                                 style={{
                                     opacity: isDraggedDescendant ? 0.5 : 1,
                                     ...style,
                                 }}
                            >
                                {handle}
                                <div className={cn(
                                    styles.rowContents,
                                    !canDrag && styles.rowContentsDragDisabled
                                )}
                                >
                                    <div className={styles.nodeContentWrapper}>
                                        {nodeContentRenderer({node, path, treeIndex, treeId})}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    }

    return NodeRendererDefault;
};


/**
 * Check if a node is a descendant of another node.
 *
 * @param {!Object} older - Potential ancestor of younger node
 * @param {!Object} younger - Potential descendant of older node
 *
 * @return {boolean}
 */
export function isDescendant(older: TreeItem, younger: TreeItem): boolean {
    return (
        !!older.children &&
        typeof older.children !== 'function' &&
        older.children.some(
            child => child === younger || isDescendant(child, younger)
        )
    );
}
