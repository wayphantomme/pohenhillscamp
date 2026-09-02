/**
 * /about-us/ — redirects to /#about
 * This page exists in WordPress as a shell (empty Elementor content).
 * Preserving the URL with a 301 redirect to the homepage anchor.
 */
import { redirect } from "next/navigation";

export default function AboutUsPage() {
  redirect("/#about");
}
