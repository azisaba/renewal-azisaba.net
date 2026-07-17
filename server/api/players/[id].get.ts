import type { ListPlayers200ResponseItemsInner } from "@azisaba/graph";

export default defineEventHandler(async (event): Promise<ListPlayers200ResponseItemsInner> => {
  const playerId = getRouterParam(event, "id")!;
  return await playersApi.getPlayerById({
    playerId,
  });
});
