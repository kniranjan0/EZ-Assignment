'use client';
import React, { useState } from "react";
import { TreeItem } from "./TreeItem";
import { getNodeName, initialData } from "./helpers";

export interface TreeNode {
    id: string;
    name: string;
    children?: TreeNode[];
    hasChildren?: boolean;
}

interface TreeViewProps {
    data: TreeNode[];
}

export const TreeView: React.FC<TreeViewProps> = ({ data }) => {
    const [tree, setTree] = useState<TreeNode[]>(data);

    const onUpdate = (
        id: string,
        updater: (node: TreeNode) => TreeNode
    ) => {
        const updateNode = (nodes: TreeNode[]): TreeNode[] =>
            nodes.map((n) =>
                n.id === id
                    ? updater(n)
                    : { ...n, children: n.children && updateNode(n.children) }
            );

        setTree((prev) => updateNode(prev));
    };

    const onDelete = (id: string) => {
        if(tree.length === 1 && tree[0].id === id) {
            setTree(initialData);
            return;
        }
        const deleteNode = (nodes: TreeNode[]): TreeNode[] =>
            nodes
                .filter((n) => n.id !== id)
                .map((n) => ({
                    ...n,
                    children: n.children && deleteNode(n.children),
                }));

        setTree((prev) => deleteNode(prev));
    };

    return (
        <div>
            {tree.map((node, index) => (
                <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8, width: "fit-content", margin: "8px 0" }} key={node.id}>
                    <TreeItem
                        key={node.id}
                        node={{ ...node, name: node.name || getNodeName(0, index) }}
                        level={0}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                </div>
            ))}
        </div>
    );
};
