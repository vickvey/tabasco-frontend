"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Plot from "react-plotly.js";

interface PlotInfo {
  cluster: number;
  words: string[];
  distances: number[];
  stats: {
    mean: number;
    median: number;
    max: number;
  };
}

interface Summary {
  cluster_id?: number;
  top_words: [string, number][];
  sentences: string[];
}

export default function ClusterPage() {
  const router = useRouter();
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [plots, setPlots] = useState<PlotInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const sessionId =
    typeof window !== "undefined"
      ? localStorage.getItem("tabasco-session-id")
      : null;
  const filename =
    typeof window !== "undefined"
      ? localStorage.getItem("tabasco-filename")
      : null;
  const targetNoun =
    typeof window !== "undefined"
      ? localStorage.getItem("tabasco-selected-noun")
      : null;

  const optimalK =
    typeof window !== "undefined"
      ? parseInt(localStorage.getItem("tabasco-optimal-k") || "3")
      : 3;

  const frequencyLimit =
    typeof window !== "undefined"
      ? parseInt(localStorage.getItem("tabasco-frequency") || "100")
      : 100;

  useEffect(() => {
    if (!sessionId || !filename || !targetNoun) {
      toast.error("Missing data. Please start over.");
      router.push("/user/upload");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      const formData = new FormData();
      formData.append("session_id", sessionId);
      formData.append("filename", filename);
      formData.append("target_word", targetNoun);
      formData.append("frequency_limit", frequencyLimit.toString());
      formData.append("num_clusters", optimalK.toString());

      try {
        const summaryRes = await fetch("/api/v1/reports/generate-summary", {
          method: "POST",
          body: formData,
        });

        const summaryJson = await summaryRes.json();
        if (!summaryRes.ok || !summaryJson.data?.summaries) {
          throw new Error(summaryJson.detail || "Failed to get summaries");
        }

        setSummaries(summaryJson.data.summaries);

        const plotRes = await fetch(
          "/api/v1/reports/generate-threshold-plots",
          {
            method: "POST",
            body: formData,
          }
        );

        const plotJson = await plotRes.json();
        if (!plotRes.ok || !plotJson.data?.plot_data) {
          throw new Error(plotJson.detail || "Failed to get threshold plots");
        }

        setPlots(plotJson.data.plot_data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load clustering data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId, filename, targetNoun, optimalK, frequencyLimit]);

  const handleBack = () => router.push("/user/elbow");
  const handleNext = () => router.push("/user/report");

  const handleDownloadSummary = () => {
    const blob = new Blob([JSON.stringify(summaries, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "summary_report.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Cluster Summary View</h1>
        <Button variant="secondary" onClick={handleBack}>
          ← Go Back
        </Button>
      </div>

      <p className="text-muted-foreground">
        Below are summaries for each cluster and their respective threshold
        plots.
      </p>

      {loading ? (
        <p className="text-muted-foreground">Loading clustering results...</p>
      ) : (
        <>
          {summaries.map((summary, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>Cluster {summary.cluster_id ?? idx + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h3 className="font-semibold text-sm mb-1">Top Words</h3>
                  <ul className="text-sm text-muted-foreground grid grid-cols-2 gap-x-4">
                    {summary.top_words.slice(0, 10).map(([word, score], i) => (
                      <li key={i}>
                        <span className="font-medium">{word}</span>{" "}
                        <span className="text-xs">({score.toFixed(3)})</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-1">
                    Sample Sentences
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {summary.sentences.slice(0, 5).map((sentence, i) => (
                      <li key={i}>• {sentence}</li>
                    ))}
                  </ul>
                  {summary.sentences.length > 5 && (
                    <Button
                      variant="link"
                      className="px-0 text-primary"
                      onClick={() =>
                        toast.info("See full summaries in downloadable report.")
                      }
                    >
                      See more
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end mt-2">
            <Button variant="outline" onClick={handleDownloadSummary}>
              ⬇ Download Summary Report
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {plots.map((plot) => (
              <Card key={plot.cluster}>
                <CardHeader>
                  <CardTitle>
                    Threshold Plot - Cluster {plot.cluster + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Plot
                    data={[
                      {
                        x: plot.words,
                        y: plot.distances,
                        type: "scatter",
                        mode: "markers",
                        marker: { color: "#4f46e5" },
                      },
                    ]}
                    layout={{
                      title: `Cosine Similarity of Context Words`,
                      xaxis: { title: "Context Word" },
                      yaxis: { title: "Cosine Similarity" },
                      height: 300,
                      margin: { t: 40, b: 60, l: 50, r: 10 },
                    }}
                    style={{ width: "100%" }}
                  />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Mean: {plot.stats.mean.toFixed(3)}</div>
                    <div>Median: {plot.stats.median.toFixed(3)}</div>
                    <div>Max: {plot.stats.max.toFixed(3)}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={handleNext}>Continue to Report</Button>
          </div>
        </>
      )}
    </div>
  );
}
