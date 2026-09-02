/**
 * /rooms/ — redirects to /#rooms
 */
import { redirect } from "next/navigation";

export default function RoomsPage() {
  redirect("/#rooms");
}
