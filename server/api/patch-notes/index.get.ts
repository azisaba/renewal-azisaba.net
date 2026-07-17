import type { ListPatchNotesRequest, ListPatchNotesResponse } from "@azisaba/graph";

export default defineEventHandler(async (event): Promise<ListPatchNotesResponse> => {
  setResponseHeader(event, "Cache-Control", "no-store, no-cache, must-revalidate");
  const request = getQuery(event) as ListPatchNotesRequest;
  return await patchNotesApi.listPatchNotes(request);
});
