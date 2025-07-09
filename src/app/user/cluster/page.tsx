"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PlotInfo {
  cluster: number;
  path: string;
  stats: {
    mean: number;
    median: number;
    max: number;
  };
}

export default function ClusterPage() {
  const router = useRouter();
  const [summaries, setSummaries] = useState<string[][]>([]);
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
      formData.append("frequency_limit", "100");
      formData.append("num_clusters", "3");

      try {
        // Fetch summaries
        const summaryRes = await fetch("/api/v1/reports/generate-summary", {
          method: "POST",
          body: formData,
        });

        const summaryJson = await summaryRes.json();
        if (!summaryRes.ok || !summaryJson.data?.summary_files) {
          throw new Error(summaryJson.detail || "Failed to get summaries");
        }

        const summariesData = await Promise.all(
          summaryJson.data.summary_files.map(async (path: string) => {
            const res = await fetch(`/api/static/${path}`);
            return (await res.text()).split("\n");
          })
        );
        setSummaries(summariesData);

        // Fetch threshold plots
        const plotRes = await fetch(
          "/api/v1/reports/generate-threshold-plots",
          {
            method: "POST",
            body: formData,
          }
        );

        const plotJson = await plotRes.json();
        if (!plotRes.ok || !plotJson.data?.plot_paths) {
          throw new Error(plotJson.detail || "Failed to get threshold plots");
        }

        setPlots(plotJson.data.plot_paths);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load clustering data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId, filename, targetNoun]);

  const handleBack = () => router.push("/user/elbow");
  const handleNext = () => router.push("/user/report");

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
          {summaries.map((lines, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>Cluster {idx + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1 line-clamp-6">
                  {lines.slice(0, 6).map((line, i) => (
                    <p key={i} className="text-muted-foreground">
                      {line}
                    </p>
                  ))}
                  {lines.length > 6 && (
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {plots.map((plot) => (
              <Card key={plot.cluster}>
                <CardHeader>
                  <CardTitle>
                    Threshold Plot - Cluster {plot.cluster + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <img
                    src={`/api/static/${plot.path}`}
                    alt={`Threshold plot cluster ${plot.cluster}`}
                    className="w-full h-auto border rounded"
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
