import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const STORAGE_KEYS = {
  sessionId: "tabasco-session-id",
  filename: "tabasco-filename",
  selectedNoun: "tabasco-selected-noun",
};

export function useTopNouns() {
  const router = useRouter();
  const [topN, setTopN] = useState(50);
  const [loading, setLoading] = useState(false);
  const [nounsData, setNounsData] = useState<Record<string, number>>({});

  const sessionId =
    typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_KEYS.sessionId)
      : null;
  const filename =
    typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_KEYS.filename)
      : null;

  const fetchTopNouns = async () => {
    if (!sessionId || !filename) {
      toast.error("Missing session. Please upload a file again.");
      router.push("/user/upload");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("session_id", sessionId);
      formData.append("filename", filename);
      formData.append("top_n", String(topN));

      const res = await fetch("/api/v1/general/top-nouns", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || !json.data?.nouns)
        throw new Error(json.detail || "Failed to fetch nouns");

      setNounsData(json.data.nouns);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch top nouns.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectNoun = (noun: string) => {
    navigator.clipboard.writeText(noun);
    localStorage.setItem(STORAGE_KEYS.selectedNoun, noun);
    toast.success(`Selected noun "${noun}" copied to clipboard.`);
    router.push("/user/elbow");
  };

  useEffect(() => {
    fetchTopNouns();
  }, []);

  return {
    topN,
    setTopN,
    loading,
    nounsData,
    fetchTopNouns,
    handleSelectNoun,
  };
}
