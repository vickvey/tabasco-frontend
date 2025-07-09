"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function NounsPage() {
  const router = useRouter();
  const [nounsData, setNounsData] = useState<Record<string, number>>({});
  const [topN, setTopN] = useState(50);
  const [loading, setLoading] = useState(false);

  const sessionId =
    typeof window !== "undefined"
      ? localStorage.getItem("tabasco-session-id")
      : null;
  const filename =
    typeof window !== "undefined"
      ? localStorage.getItem("tabasco-filename")
      : null;

  const fetchTopNouns = async () => {
    if (!sessionId || !filename) {
      toast.error("Missing session. Please upload a file again.");
      router.push("/user/upload");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("session_id", sessionId);
    formData.append("filename", filename);
    formData.append("top_n", String(topN));

    try {
      const res = await fetch("/api/v1/general/top-nouns", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok || !json.data?.nouns) {
        throw new Error(json.detail || "Failed to fetch nouns");
      }

      setNounsData(json.data.nouns);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch top nouns.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopNouns();
  }, []); // initial fetch on mount with default topN=50

  const handleSelectNoun = (noun: string) => {
    navigator.clipboard.writeText(noun);
    localStorage.setItem("tabasco-selected-noun", noun);
    toast.success(`Selected noun "${noun}" copied to clipboard.`);
    router.push("/user/elbow");
  };

  const handleBack = () => {
    router.push("/user/upload");
  };

  const chartData = {
    labels: Object.keys(nounsData).slice(0, 50),
    datasets: [
      {
        label: "Frequency",
        data: Object.values(nounsData).slice(0, 50),
        backgroundColor: "#4f46e5",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Top 50 Nouns Frequency",
      },
    },
    scales: {
      x: { ticks: { autoSkip: false, maxRotation: 90, minRotation: 45 } },
    },
  };

  const allNounEntries = Object.entries(nounsData).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Select a Noun to Continue</h1>
        <Button variant="secondary" onClick={handleBack}>
          ← Go Back
        </Button>
      </div>

      <p className="text-muted-foreground">
        You can visualize frequency of top nouns and select one for further
        analysis.
      </p>

      {/* Slider for noun amount */}
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
          <Button size="sm" onClick={fetchTopNouns}>
            Submit
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <>
          <div className="bg-card border rounded-md p-4">
            <Bar data={chartData} options={chartOptions} />
          </div>

          {/* Noun selector */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium">
              Select one noun from the list:
            </h2>
            <ScrollArea className="h-64 border rounded-md p-2">
              <ul className="space-y-2">
                {allNounEntries.map(([noun, freq]) => (
                  <li
                    key={noun}
                    className="flex justify-between items-center p-2 rounded-md hover:bg-muted cursor-pointer"
                    onClick={() => handleSelectNoun(noun)}
                  >
                    <span className="font-medium">{noun}</span>
                    <span className="text-sm text-muted-foreground">
                      {freq}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        </>
      )}
    </div>
  );
}
