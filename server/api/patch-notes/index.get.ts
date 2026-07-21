import type { ListPatchNotesRequest, ListPatchNotesResponse } from "@azisaba/graph";

export default defineEventHandler(async (event): Promise<ListPatchNotesResponse> => {
  const request = getQuery(event) as ListPatchNotesRequest;

  try {
    return await patchNotesApi.listPatchNotes(request);
  } catch (error) {
    if (error instanceof Error && "response" in error && error.response instanceof Response) {
      const response = error.response;
      const body = await response.clone().text();

      console.error("Graph API request failed", {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        headers: Object.fromEntries(response.headers.entries()),
        body,
      });
    } else {
      console.error("listPatchNotes failed", error);
    }

    throw createError({
      statusCode: 502,
      statusMessage: "Graph API request failed",
      cause: error,
    });
  }
});
