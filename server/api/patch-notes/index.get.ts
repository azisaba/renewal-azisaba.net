import type { ListPatchNotesRequest } from "@azisaba/graph";

export default defineEventHandler(async (event) => {
  const request = getQuery(event) as ListPatchNotesRequest;
  return await patchNotesApi.listPatchNotes(request);
});
