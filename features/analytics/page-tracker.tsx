"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function PageTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);
  useEffect(() => {
    if (navigator.doNotTrack === "1" || lastPath.current === pathname) return;
    lastPath.current = pathname;
    // Deliberately no query string, IP, user ID, referrer or cookies in the event payload.
    void fetch("/api/analytics/event", { method: "POST", credentials: "omit", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "PAGE_VIEW", path: pathname }), keepalive: true }).catch(() => {});
  }, [pathname]);
  return null;
}
