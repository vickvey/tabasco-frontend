"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TargetSentencesPage() {
  const router = useRouter();

  const [sentences, setSentences] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [maxLength, setMaxLength] = useState(510); // default value
  const [minLength, setMinLength] = useState(5); // default value
  const [maxSentences, setMaxSentences] = useState(300); // default

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchData(); // auto-fetch on first render
  }, []);

  const fetchData = async () => {
    const session_id = localStorage.getItem("tabasco-session-id");
    const filename = localStorage.getItem("tabasco-filename");
    const target_noun = localStorage.getItem("tabasco-selected-noun"); // ✅ corrected key

    if (!session_id || !filename || !target_noun) {
      toast.error("Missing session ID, filename, or noun.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("session_id", session_id);
      formData.append("filename", filename);
      formData.append("target_noun", target_noun);
      formData.append("max_sentence_length", maxLength.toString());
      formData.append("min_sentence_length", minLength.toString());
      formData.append("max_sentences", maxSentences.toString());

      const response = await fetch("/api/v1/target-sentences", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      if (!data || !data.matched_sentences) {
        toast.error("No data returned.");
        return;
      }

      setSentences(data.matched_sentences);
      setSubmitted(true);
    } catch (err) {
      toast.error("Error fetching data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Go Back Button */}
      <div>
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sentence Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Max Sentence Length: {maxLength}</Label>
            <Slider
              min={5}
              max={510}
              step={5}
              value={[maxLength]}
              onValueChange={(val) => setMaxLength(val[0])}
            />
          </div>

          <div className="space-y-2">
            <Label>Min Sentence Length: {minLength}</Label>
            <Slider
              min={0}
              max={50}
              step={1}
              value={[minLength]}
              onValueChange={(val) => setMinLength(val[0])}
            />
          </div>

          <div className="space-y-2">
            <Label>Max Number of Sentences: {maxSentences}</Label>
            <Slider
              min={50}
              max={500}
              step={10}
              value={[maxSentences]}
              onValueChange={(val) => setMaxSentences(val[0])}
            />
          </div>

          <Button onClick={fetchData} disabled={loading}>
            {loading ? "Loading..." : "Get Sentences"}
          </Button>
        </CardContent>
      </Card>

      {submitted && (
        <Card>
          <CardHeader>
            <CardTitle>Target Sentences</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] w-full rounded-md border p-2">
              <div className="space-y-4">
                {sentences.map((sentence, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-3 border rounded-md bg-muted flex justify-between items-start gap-2"
                    )}
                  >
                    <span className="text-sm">{sentence}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleCopy(sentence)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
