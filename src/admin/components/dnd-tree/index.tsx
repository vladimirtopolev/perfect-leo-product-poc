import React from 'react';
import SortableTree, {ThemeProps, TreeItem} from 'react-sortable-tree';
import customizeDefaultTheme from './themes/default';

type DndTree<T> = {
    treeData: T[],
    onChange: (treeData: T[]) => void,
    rowHeight?: number,
    scaffoldBlockPxWidth?: number,
    theme?: ThemeProps
}

export default function <T extends TreeItem>({treeData, onChange, rowHeight, scaffoldBlockPxWidth, theme}: DndTree<T>) {
    return (
        <SortableTree treeData={treeData}
                      onChange={onChange}
                      rowHeight={rowHeight}
                      scaffoldBlockPxWidth={scaffoldBlockPxWidth}
                      theme={theme}/>
    )
}
