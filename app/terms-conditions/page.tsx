/**
 * /terms-conditions/ — redirects to /#terms
 */
import { redirect } from "next/navigation";

export default function TermsConditionsPage() {
  redirect("/#terms");
}
