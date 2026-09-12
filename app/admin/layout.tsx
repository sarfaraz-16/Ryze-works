import React from "react";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata = {
  title: "Command Center | Ryze Works",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
