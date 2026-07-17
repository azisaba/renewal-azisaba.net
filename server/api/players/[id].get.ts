import type { ListPlayers200ResponseItemsInner } from "@azisaba/graph";

export default defineEventHandler(async (event): Promise<ListPlayers200ResponseItemsInner> => {
  setResponseHeader(event, "Cache-Control", "no-store, no-cache, must-revalidate");
  const playerId = getRouterParam(event, "id")!;
  return await playersApi.getPlayerById({
    playerId,
  });
});
