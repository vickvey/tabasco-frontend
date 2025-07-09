"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, Trash2 } from "lucide-react";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadMeta, setUploadMeta] = useState<{
    session_id: string;
    filename: string;
    text_length: number;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] ?? null;
    setFile(uploadedFile);
    // reset if previously uploaded
    setUploadSuccess(false);
    setUploadMeta(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await fetch("/api/v1/general/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const json = await res.json();
      const data = json.data;

      localStorage.setItem("tabasco-session-id", data.session_id);

      setUploadSuccess(true);
      setUploadMeta({
        session_id: data.session_id,
        filename: data.filename,
        text_length: data.text_length,
      });
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    setFile(null);
    setUploadSuccess(false);
    setUploadMeta(null);
    localStorage.removeItem("tabasco-session-id");
  };

  const handleContinue = () => {
    router.push("/user/nouns");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Upload Your Domain PDF</h1>
      <p className="text-muted-foreground">
        Select a domain-specific PDF or TXT file to begin the analysis.
      </p>

      {!uploadSuccess && (
        <div className="flex items-center gap-4">
          <Input type="file" accept=".pdf,.txt" onChange={handleFileChange} />
          <Button onClick={handleUpload} disabled={!file || loading}>
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      )}

      {uploadSuccess && uploadMeta && (
        <Alert className="bg-green-50 border-green-400">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-700">Upload Successful</AlertTitle>
          <AlertDescription>
            <div className="text-sm mt-1 text-foreground">
              <div>
                <strong>File:</strong> {uploadMeta.filename}
              </div>
              <div>
                <strong>Session ID:</strong>{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                  {uploadMeta.session_id}
                </code>
              </div>
              <div>
                <strong>Text Length:</strong> {uploadMeta.text_length} chars
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <Button onClick={handleContinue}>Continue</Button>
              <Button
                variant="destructive"
                className="flex items-center gap-2"
                onClick={handleDiscard}
              >
                <Trash2 className="h-4 w-4" />
                Discard & Re-upload
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
