// app/user/layout.tsx (SERVER)
import type { Metadata } from "next";
import ClientUserLayout from "./_components/client-user-layout";

export const metadata: Metadata = {
  title: "Tabasco Session",
  description: "Interactively analyze your domain document with Tabasco.",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientUserLayout>{children}</ClientUserLayout>;
}
