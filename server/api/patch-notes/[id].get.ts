export default defineEventHandler(async (event) => {
  const patchNoteId = getRouterParam(event, "id")!;
  return await patchNotesApi.getPatchNoteById({
    patchNoteId,
  });
});
