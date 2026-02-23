"use client";

import SwipeDrama from "@/components/SwipeDrama";
import React from "react";
export default function SwipeDramaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);

  return (
    <>
      <SwipeDrama />
    </>
  );
}
