"use client";

import dynamic from "next/dynamic";

export const LoaderClient = dynamic(
  () => import("./loader").then((m) => m.Loader),
  { ssr: false }
);
