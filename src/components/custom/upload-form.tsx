// components/UploadForm.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UploadForm({
  onFileChange,
  onUpload,
  disabled,
  loading,
}: {
  onFileChange: (file: File | null) => void;
  onUpload: () => void;
  disabled: boolean;
  loading: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <Input
        type="file"
        accept=".pdf,.txt"
        onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
      />
      <Button onClick={onUpload} disabled={disabled}>
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
}
