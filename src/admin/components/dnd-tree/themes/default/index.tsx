import React from 'react';
import {ThemeProps, TreeRenderer} from 'react-sortable-tree';

import customizeTreeNodeRenderer from './customizeTreeNodeRenderer';
import customizeNodeContentRenderer, {
    CollapseButtonRendererProps, DragSourceRendererProps,
    NodeContentRendererProps
} from './customizeNodeContentRenderer';


type CustomizeDefaultThemeProps = {
    specificNodeContentRenderer?: (props: NodeContentRendererProps) => JSX.Element,
    specificCollapseButtonRenderer?: (props: CollapseButtonRendererProps) => JSX.Element,
    specificDragSourceRenderer?: (props: DragSourceRendererProps) => JSX.Element
}
export default function customizeDefaultTheme(props: CustomizeDefaultThemeProps): ThemeProps {
    return {
        treeNodeRenderer: customizeTreeNodeRenderer(),
        nodeContentRenderer: customizeNodeContentRenderer(props)
    }
}
