"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function ElbowPage() {
  const router = useRouter();

  const [frequency, setFrequency] = useState(50);
  const [elbowData, setElbowData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const sessionId =
    typeof window !== "undefined"
      ? localStorage.getItem("tabasco-session-id")
      : null;
  const filename =
    typeof window !== "undefined"
      ? localStorage.getItem("tabasco-filename")
      : null;
  const noun =
    typeof window !== "undefined"
      ? localStorage.getItem("tabasco-selected-noun")
      : null;

  const fetchElbowData = async () => {
    if (!sessionId || !filename || !noun) {
      toast.error("Missing session or noun. Please go back and reselect.");
      router.push("/user/nouns");
      return;
    }

    const formData = new FormData();
    formData.append("session_id", sessionId);
    formData.append("filename", filename);
    formData.append("target_word", noun);
    formData.append("frequency", frequency.toString());

    setLoading(true);
    try {
      const res = await fetch("/api/v1/ambiguities/target-matrix", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok || !json.data) {
        throw new Error(json.detail || "Failed to get elbow data");
      }

      setElbowData(json.data);
      toast.success("Elbow data fetched.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to get elbow data.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/user/nouns");
  };

  const handleContinue = () => {
    router.push("/user/cluster");
  };

  const lineData = {
    labels: elbowData?.k_range || [],
    datasets: [
      {
        label: "WCSS",
        data: elbowData?.wcss || [],
        fill: false,
        backgroundColor: "#4f46e5",
        borderColor: "#4f46e5",
        tension: 0.2,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Elbow Plot - Optimal Clusters",
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Elbow Plot for <span className="text-indigo-600">{noun}</span>
        </h1>
        <Button variant="secondary" onClick={handleBack}>
          ← Go Back
        </Button>
      </div>

      <p className="text-muted-foreground">
        This step helps determine the optimal number of clusters for the target
        noun based on sentence similarity.
      </p>

      <div className="flex items-center gap-4">
        <span className="text-sm">Sentence Frequency:</span>
        <Slider
          min={10}
          max={1000}
          step={10}
          defaultValue={[frequency]}
          onValueChange={(val) => setFrequency(val[0])}
          className="w-64"
        />
        <Button onClick={fetchElbowData} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </Button>
      </div>

      {elbowData && (
        <>
          <div className="bg-card border rounded-md p-4">
            <Line data={lineData} options={lineOptions} />
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <strong>Optimal Clusters (k):</strong> {elbowData.optimal_k}
            </div>
            <div>
              <strong>Sentence Count:</strong> {elbowData.sentence_count}
            </div>
            <div>
              <strong>Matrix Shape:</strong>{" "}
              {elbowData.matrix_shape.join(" x ")}
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleContinue}>Continue →</Button>
          </div>
        </>
      )}
    </div>
  );
}
