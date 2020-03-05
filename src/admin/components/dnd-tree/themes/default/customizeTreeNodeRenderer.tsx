import React, {Component, Children, cloneElement} from 'react';
import cn from 'classnames';
import styles from './TreeNodeRenderer.module.scss';
import {TreeRendererProps} from 'react-sortable-tree';

export default () => {
    class CustomizeTreeNodeRenderer extends Component<TreeRendererProps, any> {
        render() {
            const {
                children,
                listIndex,
                swapFrom = 0,
                swapLength = 0,
                swapDepth,
                scaffoldBlockPxWidth,
                lowerSiblingCounts,
                connectDropTarget,
                isOver,
                draggedNode,
                canDrop,
                treeIndex,
                treeId, // Delete from otherProps
                getPrevRow, // Delete from otherProps
                node, // Delete from otherProps
                path, // Delete from otherProps
                rowDirection,
                ...otherProps
            } = this.props;

            const rowDirectionClass = rowDirection === 'rtl' ? 'rst__rtl' : null;

            // Construct the scaffold representing the structure of the tree
            const scaffoldBlockCount = lowerSiblingCounts.length;
            const scaffold: JSX.Element[] = [];
            lowerSiblingCounts.forEach((lowerSiblingCount, i) => {
                let lineClass = '';
                if (lowerSiblingCount > 0) {
                    // At this level in the tree, the nodes had sibling nodes further down

                    if (listIndex === 0) {
                        // Top-left corner of the tree
                        // +-----+
                        // |     |
                        // |  +--+
                        // |  |  |
                        // +--+--+
                        lineClass = cn(styles.lineHalfHorizontalRight, styles.lineHalfVerticalBottom);
                    } else if (i === scaffoldBlockCount - 1) {
                        // Last scaffold block in the row, right before the row content
                        // +--+--+
                        // |  |  |
                        // |  +--+
                        // |  |  |
                        // +--+--+
                        lineClass = cn(styles.lineHalfHorizontalRight, styles.lineFullVertical);
                    } else {
                        // Simply connecting the line extending down to the next sibling on this level
                        // +--+--+
                        // |  |  |
                        // |  |  |
                        // |  |  |
                        // +--+--+
                        lineClass = styles.lineFullVertical;
                    }
                } else if (listIndex === 0) {
                    // Top-left corner of the tree, but has no siblings
                    // +-----+
                    // |     |
                    // |  +--+
                    // |     |
                    // +-----+
                    lineClass = styles.lineHalfHorizontalRight;
                } else if (i === scaffoldBlockCount - 1) {
                    // The last or only node in this level of the tree
                    // +--+--+
                    // |  |  |
                    // |  +--+
                    // |     |
                    // +-----+
                    lineClass = cn(styles.lineHalfVerticalTop, styles.lineHalfHorizontalRight);
                }

                scaffold.push(
                    <div
                        key={`pre_${1 + i}`}
                        style={{width: scaffoldBlockPxWidth}}
                        className={cn(styles.lineBlock, lineClass, rowDirectionClass)}
                    />
                );

                if (treeIndex !== listIndex && i === swapDepth) {
                    // This row has been shifted, and is at the depth of
                    // the line pointing to the new destination
                    let highlightLineClass = '';

                    if (listIndex === swapFrom + swapLength - 1) {
                        // This block is on the bottom (target) line
                        // This block points at the target block (where the row will go when released)
                        highlightLineClass = styles.highlightBottomLeftCorner;
                    } else if (treeIndex === swapFrom) {
                        // This block is on the top (source) line
                        highlightLineClass = styles.highlightTopLeftCorner;
                    } else {
                        // This block is between the bottom and top
                        highlightLineClass = styles.highlightLineVertical;
                    }

                    let style;
                    if (rowDirection === 'rtl') {
                        style = {
                            width: scaffoldBlockPxWidth,
                            right: scaffoldBlockPxWidth * i,
                        };
                    } else {
                        // Default ltr
                        style = {
                            width: scaffoldBlockPxWidth,
                            left: scaffoldBlockPxWidth * i,
                        };
                    }

                    scaffold.push(
                        <div key={i}
                             style={style}
                             className={cn(
                                 styles.absoluteLineBlock,
                                 highlightLineClass,
                                 rowDirectionClass
                             )}
                        />
                    );
                }
            });

            let style = {left: scaffoldBlockPxWidth * scaffoldBlockCount};

            return connectDropTarget(
                <div
                    {...otherProps}
                    className={cn(styles.node, rowDirectionClass)}
                >
                    {scaffold}

                    <div className={styles.nodeContent} style={style}>
                        {Children.map(children, child =>
                            cloneElement(child, {
                                isOver,
                                canDrop,
                                draggedNode,
                            })
                        )}
                    </div>
                </div>
            );
        }
    }

    return CustomizeTreeNodeRenderer;
}
