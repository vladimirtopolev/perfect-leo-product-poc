import React, { Fragment } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import styles from './NodeContentRenderer.module.scss';
import {NodeContentRendererProps} from '../../../components/dnd-tree/themes/default/customizeNodeContentRenderer';

export default (props:NodeContentRendererProps) => {
    const id = '_' + Math.random().toString(36).substr(2, 9);
    return (
        <Fragment>
            <ContextMenuTrigger id={id}>
                <div className={styles.nodeContent}>
                    {props.node.title}
                    <div className={styles.toolBar}>
                        <button className={styles.btn}>
                            <i className="far fa-trash-alt"/>
                        </button>
                    </div>
                </div>
            </ContextMenuTrigger>
            <ContextMenu id={id}>
                <MenuItem>
                    ContextMenu Item 1
                </MenuItem>
            </ContextMenu>
        </Fragment>
    )
}
