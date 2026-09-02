/**
 * /activities/ — redirects to /#activities
 */
import { redirect } from "next/navigation";

export default function ActivitiesPage() {
  redirect("/#activities");
}
