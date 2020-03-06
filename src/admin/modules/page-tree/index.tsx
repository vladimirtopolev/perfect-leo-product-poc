import React, {useState} from 'react';
import DndTree from '../../components/dnd-tree';
import {PageItem} from './types';

import CollapseButtonRenderer from './components/CollapseButtonRenderer';
import DragSourceRenderer from './components/DragSourceRenderer';
import NodeContentRenderer from './components/NodeContentRenderer';
import customizeDefaultTheme from '../../components/dnd-tree/themes/default';

const pageTree: PageItem[] = [
    {
        _id: 1,
        title: 'HomePage',
        children: [
            {
                _id: 2,
                title: 'About us'
            },
            {
                _id: 3,
                title: 'Products',
                children: [
                    {
                        _id: 4,
                        title: '1'
                    },
                    {
                        _id: 5,
                        title: '2'
                    }
                ]
            }
        ]
    }
];

export default () => {
    const [treeData, changeTreeData] = useState<PageItem[]>(pageTree);

    return (
        <div style={{ height: 400 }}>
                <DndTree<PageItem>
                    treeData={treeData}
                    onChange={changeTreeData}
                    rowHeight={40}
                    theme={customizeDefaultTheme({
                        specificCollapseButtonRenderer: CollapseButtonRenderer,
                        specificDragSourceRenderer: DragSourceRenderer,
                        specificNodeContentRenderer: NodeContentRenderer
                    })}
                />
        </div>
    )
}
