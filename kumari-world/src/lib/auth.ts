import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return user;
}

export function displayName(user: { user_metadata?: { full_name?: string }; email?: string }) {
  return (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "Student";
}
