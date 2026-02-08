import { initialData } from "@/components/helpers";
import { KanbanBoard } from "@/components/KanbanBoard";
import { TreeView } from "@/components/TreeView";

export default function Home() {
  return (
    <div style={{ display: "flex", gap: 62, padding: 32, flexDirection: "column", alignItems: "flex-start" }}>
      <TreeView data={initialData} />
      <KanbanBoard />
    </div>
  );
}
