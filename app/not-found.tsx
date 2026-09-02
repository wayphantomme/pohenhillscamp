import Link from "next/link";
import { SITE } from "@/data/site";

export default function NotFound() {
  return (
    <div className="ph-section ph-not-found">
      <div className="ph-container ph-not-found__inner">
        <h1>404 — Page Not Found</h1>
        <p>The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="ph-btn ph-btn--primary">
          Back to {SITE.name}
        </Link>
      </div>
    </div>
  );
}
