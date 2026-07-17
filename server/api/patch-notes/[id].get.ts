import type { ListPatchNotes200ResponseItemsInner } from "@azisaba/graph";

export default defineEventHandler(async (event): Promise<ListPatchNotes200ResponseItemsInner> => {
  setResponseHeader(event, "Cache-Control", "no-store, no-cache, must-revalidate");
  const patchNoteId = getRouterParam(event, "id")!;
  return await patchNotesApi.getPatchNoteById({
    patchNoteId,
  });
});
