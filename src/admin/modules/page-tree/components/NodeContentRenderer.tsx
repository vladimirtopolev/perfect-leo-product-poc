import React, {useState} from 'react';
import cn from 'classnames';
import styles from './NodeContentRenderer.module.scss';
import {NodeContentRendererProps} from '../../../components/dnd-tree/themes/default/customizeNodeContentRenderer';

export default (props: NodeContentRendererProps) => {
    //const [isOpen, changeContextMenuState] = useState(true);

    return (
        <div className={styles.nodeContent} onContextMenu={(e) => {
            //e.preventDefault();
            e.persist();
            console.log(e.clientX, e.clientY);
            //changeContextMenuState(true)
        }}>
            {props.node.title}
            <div className={styles.toolBar}>
                <button className={styles.btn}>
                    <i className="far fa-trash-alt"/>
                </button>
            </div>
        </div>
    );
}
