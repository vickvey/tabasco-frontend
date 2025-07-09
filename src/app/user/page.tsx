// app/user/page.tsx
import { redirect } from "next/navigation";

export default function UserIndex() {
  redirect("/user/upload");
}
