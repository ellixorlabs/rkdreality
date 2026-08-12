"use client";

import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "@/sanity/schemaTypes";
import {structure} from "@/sanity/structure";
import {dataset, projectId} from "@/sanity/env";

const SINGLETON_TYPES = new Set(["siteSettings", "hero", "founder"]);

export default defineConfig({
  name: "default",
  title: "RKD Reality",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool({structure}), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({schemaType}) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    actions: (input, {schemaType}) =>
      SINGLETON_TYPES.has(schemaType)
        ? input.filter(({action}) =>
            ["publish", "discardChanges", "restore"].includes(action ?? "")
          )
        : input,
  },
});
