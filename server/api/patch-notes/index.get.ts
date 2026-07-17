import type { ListPatchNotesRequest, ListPatchNotesResponse } from "@azisaba/graph";

export default defineEventHandler(async (event): Promise<ListPatchNotesResponse> => {
  const request = getQuery(event) as ListPatchNotesRequest;
  return await patchNotesApi.listPatchNotes(request);
});
