import type { ListPatchNotes200ResponseItemsInner } from "@azisaba/graph";

export default defineCachedEventHandler(
  async (event): Promise<ListPatchNotes200ResponseItemsInner> => {
    const patchNoteId = getRouterParam(event, "id")!;
    try {
      return await patchNotesApi.getPatchNoteById(
        {
          patchNoteId,
        },
        {
          signal: AbortSignal.timeout(1000),
        },
      );
    } catch (error) {
      console.error("getPatchNoteById failed", error);
      throw error;
    }
  },
  {
    maxAge: 60 * 5,
    swr: true,
  },
);
