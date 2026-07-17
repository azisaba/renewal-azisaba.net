import type { ListPlayers200ResponseItemsInner } from "@azisaba/graph";

export default defineEventHandler(async (event): Promise<ListPlayers200ResponseItemsInner> => {
  const playerId = getRouterParam(event, "id")!;
  try {
    return await playersApi.getPlayerById({
      playerId,
    });
  } catch (error) {
    console.error("getPatchNoteById failed", error);
    throw error;
  }
});
