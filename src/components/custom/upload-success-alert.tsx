import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function UploadSuccessAlert({
  meta,
  onDiscard,
}: {
  meta: { session_id: string; filename: string; text_length: number };
  onDiscard: () => void;
}) {
  const router = useRouter();

  return (
    <Alert className="bg-green-50 dark:bg-green-950 border-green-400 dark:border-green-800">
      <CheckCircle className="h-5 w-5 text-green-600" />
      <AlertTitle className="text-green-700">Upload Successful</AlertTitle>
      <AlertDescription>
        <div className="text-sm mt-1 text-foreground">
          <div>
            <strong>File:</strong> {meta.filename}
          </div>
          <div>
            <strong>Session ID:</strong>{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-xs">
              {meta.session_id}
            </code>
          </div>
          <div>
            <strong>Text Length:</strong> {meta.text_length} chars
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <Button onClick={() => router.push("/user/nouns")}>Continue</Button>
          <Button
            variant="destructive"
            className="flex items-center gap-2"
            onClick={onDiscard}
          >
            <Trash2 className="h-4 w-4" />
            Discard & Re-upload
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
