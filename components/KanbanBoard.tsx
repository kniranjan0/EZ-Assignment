'use client';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";
import React, { useState } from "react";

interface Card {
    id: string;
    title: string;
}

interface Column {
    id: string;
    title: string;
    cards: Card[];
}

const generateId = (): string => {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

const initialData: Column[] = [
    { id: "todo", title: "Todo", cards: [] },
    { id: "progress", title: "In Progress", cards: [] },
    { id: "done", title: "Done", cards: [] },
];

export const KanbanBoard: React.FC = () => {
    const [columns, setColumns] = useState<Column[]>(initialData);

    const onDragEnd = (result: DropResult): void => {
        if (!result.destination) return;

        const sourceCol: Column | undefined = columns.find(
            (c: Column) => c.id === result.source.droppableId
        );
        const destCol: Column | undefined = columns.find(
            (c: Column) => c.id === result.destination!.droppableId
        );

        if (!sourceCol || !destCol) return;

        const [moved]: Card[] = sourceCol.cards.splice(result.source.index, 1);
        destCol.cards.splice(result.destination.index, 0, moved);

        setColumns([...columns]);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", border: "1px solid #ccc", padding: 16, borderRadius: 8, width: "fit-content" }}>
                {columns.map((col: Column) => (
                    <Droppable droppableId={col.id} key={col.id}>
                        {(p) => (
                            <div
                                ref={p.innerRef}
                                {...p.droppableProps}
                                style={{ width: 250., minHeight: 100, background: "#f9f9f9", padding: 16, borderRadius: 8 }}
                            >
                                <h3>{col.title}</h3>

                                <button
                                    onClick={() => {
                                        col.cards.push({
                                            id: generateId(),
                                            title: "",
                                        });
                                        setColumns([...columns]);
                                    }}
                                >
                                    + Add
                                </button>

                                {col.cards.map((card: Card, i: number) => (
                                    <Draggable
                                        draggableId={card.id}
                                        index={i}
                                        key={card.id}
                                    >
                                        {(p) => (
                                            <div
                                                ref={p.innerRef}
                                                {...p.draggableProps}
                                                {...p.dragHandleProps}
                                                style={{
                                                    padding: 8,
                                                    margin: "8px 0",
                                                    background: "#eee",
                                                    ...p.draggableProps.style,
                                                }}
                                            >
                                                <input
                                                placeholder="Card Title"
                                                    value={card.title}
                                                    onChange={(e) => {
                                                        card.title = e.target.value;
                                                        setColumns([...columns]);
                                                    }}
                                                />

                                                <button
                                                    onClick={() => {
                                                        col.cards.splice(i, 1);
                                                        setColumns([...columns]);
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}

                                {p.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};
