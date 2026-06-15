import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Server-only fetches cached via Next tags + on-demand revalidation.
  // Skip the Sanity CDN so revalidated fetches return fresh content.
  useCdn: false,
});
