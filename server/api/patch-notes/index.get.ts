import type { ListPatchNotesRequest, ListPatchNotesResponse } from "@azisaba/graph";

export default defineCachedEventHandler(
  async (event): Promise<ListPatchNotesResponse> => {
    const request = getQuery(event) as ListPatchNotesRequest;
    try {
      return await patchNotesApi.listPatchNotes(request, {
        signal: AbortSignal.timeout(1000),
      });
    } catch (error) {
      console.error("listPatchNotes failed", error);
      throw error;
    }
  },
  {
    maxAge: 60 * 5,
    swr: true,
  },
);
