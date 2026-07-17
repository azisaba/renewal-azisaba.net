import { Configuration, PatchNotesApi, PlayersApi } from "@azisaba/graph";

const config = useRuntimeConfig();

export const patchNotesApi = new PatchNotesApi(
  new Configuration({
    accessToken: config.graphApiKey,
  }),
);

export const playersApi = new PlayersApi(
  new Configuration({
    accessToken: config.graphApiKey,
  }),
);
