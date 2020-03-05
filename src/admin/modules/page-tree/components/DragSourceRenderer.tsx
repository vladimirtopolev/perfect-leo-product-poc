import React from 'react';
import cn from 'classnames';
import styles from './drag-source-renderer.module.scss';
import {DragSourceRendererProps} from '../../../components/dnd-tree/themes/default/customizeNodeContentRenderer';

export default ({ node, treeIndex, path, toggleChildrenVisibility }:DragSourceRendererProps) => {
    return (
        <div className={styles.wrapper}
             onDoubleClick={() =>
                 toggleChildrenVisibility && toggleChildrenVisibility({ node, path, treeIndex })}>
            {node.expanded
                ? <i className={cn('fas', 'fa-folder-open')}/>
                : <i className={cn('fas', 'fa-folder')}/>}
        </div>
    )
}
