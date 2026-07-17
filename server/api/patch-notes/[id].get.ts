import type { ListPatchNotes200ResponseItemsInner } from "@azisaba/graph";

export default defineEventHandler(async (event): Promise<ListPatchNotes200ResponseItemsInner> => {
  const patchNoteId = getRouterParam(event, "id")!;
  try {
    return await patchNotesApi.getPatchNoteById({
      patchNoteId,
    });
  } catch (error) {
    console.error("getPatchNoteById failed", error);
    throw error;
  }
});
