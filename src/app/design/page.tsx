import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DesignGallery } from "./design-gallery";

export const metadata: Metadata = {
  title: "Design system",
  description:
    "ApplyPilot tokens, typography, components, and domain patterns in a live gallery.",
};

export default function DesignSystemPage() {
  const enabled =
    process.env.NODE_ENV !== "production" ||
    process.env.ENABLE_DESIGN_GALLERY === "true";

  if (!enabled) {
    notFound();
  }

  return <DesignGallery />;
}
