// components/NounList.tsx
import { ScrollArea } from "@/components/ui/scroll-area";

export function NounList({
  nouns,
  onSelect,
}: {
  nouns: Record<string, number>;
  onSelect: (noun: string) => void;
}) {
  const entries = Object.entries(nouns).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-medium">Select one noun from the list:</h2>
      <ScrollArea className="h-64 border rounded-md p-2">
        <ul className="space-y-2">
          {entries.map(([noun, freq]) => (
            <li
              key={noun}
              className="flex justify-between items-center p-2 rounded-md hover:bg-muted cursor-pointer"
              onClick={() => onSelect(noun)}
            >
              <span className="font-medium">{noun}</span>
              <span className="text-sm text-muted-foreground">{freq}</span>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
