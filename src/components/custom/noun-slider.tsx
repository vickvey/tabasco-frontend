import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export function NounSlider({
  topN,
  setTopN,
  onSubmit,
}: {
  topN: number;
  setTopN: (n: number) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-2">
      <label className="font-medium text-sm text-foreground">
        Select how many top nouns to fetch (up to 200):
      </label>
      <div className="flex items-center gap-4">
        <Slider
          min={20}
          max={200}
          step={10}
          value={[topN]}
          onValueChange={([val]) => setTopN(val)}
          className="w-[200px]"
        />
        <span className="text-sm">{topN} nouns</span>
        <Button size="sm" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
