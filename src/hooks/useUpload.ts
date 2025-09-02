import { useState, useEffect } from "react";

const STORAGE_KEYS = {
  sessionId: "tabasco-session-id",
  filename: "tabasco-filename",
  textLength: "tabasco-text-length",
};

export function useUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadMeta, setUploadMeta] = useState<null | {
    session_id: string;
    filename: string;
    text_length: number;
  }>(null);

  const uploadSuccess = !!uploadMeta;

  useEffect(() => {
    const sid = localStorage.getItem(STORAGE_KEYS.sessionId);
    const fname = localStorage.getItem(STORAGE_KEYS.filename);
    const tlen = localStorage.getItem(STORAGE_KEYS.textLength);

    if (sid && fname && tlen) {
      setUploadMeta({
        session_id: sid,
        filename: fname,
        text_length: parseInt(tlen),
      });
    }
  }, []);

  const handleFileChange = (file: File | null) => {
    setFile(file);
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

      const { data } = await res.json();

      localStorage.setItem(STORAGE_KEYS.sessionId, data.session_id);
      localStorage.setItem(STORAGE_KEYS.filename, data.filename);
      localStorage.setItem(
        STORAGE_KEYS.textLength,
        data.text_length.toString()
      );

      setUploadMeta(data);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    setFile(null);
    setUploadMeta(null);
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  };

  return {
    file,
    setFile: handleFileChange,
    loading,
    uploadSuccess,
    uploadMeta,
    handleUpload,
    handleDiscard,
  };
}
