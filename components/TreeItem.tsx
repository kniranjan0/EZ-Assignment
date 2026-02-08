'use client';
import React, { useState } from "react";
import { TreeNode } from "./TreeView";
import { generateId, getNodeName, getPrefix } from "./helpers";

interface Props {
    node: TreeNode;
    level: number;
    onUpdate: (id: string, fn: (n: TreeNode) => TreeNode) => void;
    onDelete: (id: string) => void;
}

export const TreeItem: React.FC<Props> = ({
    node,
    level,
    onUpdate,
    onDelete,
}) => {
    const [expanded, setExpanded] = useState(true);

    return (
        <div style={{ margin: "4px 0" }}>
            <span style={{ fontFamily: "sans-serif", whiteSpace: "pre" }}>
                {getPrefix(level)}
            </span>

            <span
                onClick={() => setExpanded(!expanded)}
                style={{ cursor: "pointer", marginRight: 4 }}
            >
                {node.children && (expanded ? "▼" : "▶")}
            </span>

            <span>{node.name}</span>

            <button
                onClick={() =>
                    onUpdate(node.id, (n) => {
                        const count = n.children?.length || 0;
                        return {
                            ...n,
                            children: [
                                ...(n.children || []),
                                {
                                    id: generateId(),
                                    name: getNodeName(level + 1, count),
                                },
                            ],
                        };
                    })
                }
            >
                +
            </button>

            <button onClick={() => onDelete(node.id)}>×</button>

            {expanded &&
                node.children?.map((child) => (
                    <TreeItem
                        key={child.id}
                        node={child}
                        level={level + 1}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))}
        </div>

    );
};
