// page.tsx
"use client";

import { useTopNouns } from "@/hooks/useTopNouns";
import { NounSlider } from "@/components/custom/noun-slider";
import { NounChart } from "@/components/custom/noun-chart";
import { NounList } from "@/components/custom/noun-list";
import { Button } from "@/components/ui/button";

export default function NounsPage() {
  const { topN, setTopN, loading, nounsData, fetchTopNouns, handleSelectNoun } =
    useTopNouns();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Select a Noun to Continue</h1>
        <Button variant="secondary" onClick={() => history.back()}>
          ← Go Back
        </Button>
      </div>

      <p className="text-muted-foreground">
        You can visualize frequency of top nouns and select one for further
        analysis.
      </p>

      <NounSlider topN={topN} setTopN={setTopN} onSubmit={fetchTopNouns} />

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <>
          <NounChart nouns={nounsData} />
          <NounList nouns={nounsData} onSelect={handleSelectNoun} />
        </>
      )}
    </div>
  );
}
