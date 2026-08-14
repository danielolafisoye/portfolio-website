import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./giveaway.css";

export const metadata: Metadata = {
  title: "DannySoftDev Tech Giveaway",
  description:
    "The official DannySoftDev community tech giveaway.",
};

export default function GiveawayLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}