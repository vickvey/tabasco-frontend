"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] ?? null;
    setFile(uploadedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      // Assuming API returns a session ID to store
      const data = await res.json();
      localStorage.setItem("tabasco-session-id", data.session_id);

      // Redirect to next step
      router.push("/user/nouns");
    } catch (err) {
      console.error(err);
      alert("Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Upload Your Domain PDF</h1>
      <p className="text-muted-foreground">
        Select a domain-specific PDF document to begin analysis.
      </p>

      <Input type="file" accept=".pdf" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={!file || loading}>
        {loading ? "Uploading..." : "Upload & Continue"}
      </Button>
    </div>
  );
}
