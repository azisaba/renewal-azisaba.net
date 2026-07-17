import { Configuration, PatchNotesApi } from "@azisaba/graph";

const config = useRuntimeConfig();

export const patchNotesApi = new PatchNotesApi(
  new Configuration({
    accessToken: config.graphApiKey,
  }),
);
