// page.tsx
"use client";

import { useUpload } from "@/hooks";
import { UploadForm } from "@/components/custom/upload-form";
import { UploadSuccessAlert } from "@/components/custom/upload-success-alert";

export default function UploadPage() {
  const {
    file,
    setFile,
    loading,
    uploadSuccess,
    uploadMeta,
    handleUpload,
    handleDiscard,
  } = useUpload();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Upload Your Domain PDF</h1>
      <p className="text-muted-foreground">
        Select a domain-specific PDF or TXT file to begin the analysis.
      </p>

      {!uploadSuccess && (
        <UploadForm
          onFileChange={setFile}
          onUpload={handleUpload}
          disabled={!file || loading}
          loading={loading}
        />
      )}

      {uploadSuccess && uploadMeta && (
        <UploadSuccessAlert meta={uploadMeta} onDiscard={handleDiscard} />
      )}
    </div>
  );
}
