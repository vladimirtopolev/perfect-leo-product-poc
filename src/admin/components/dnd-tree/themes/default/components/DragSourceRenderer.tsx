import React from 'react';
import styles from './DragSourceRenderer.module.scss';
import {DragSourceRendererProps} from '../customizeNodeContentRenderer';

export default (props: DragSourceRendererProps) => <div className={styles.moveHandle}/>
