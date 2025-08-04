import ky, { HTTPError, type KyResponse } from "ky";

const baseApi = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/v1",
  timeout: 60000,
  credentials: "same-origin",
});

const tokenInterceptor = (request: Request) => {
  const serverKey = import.meta.env.VITE_SERVER_KEY;
  if (serverKey) {
    request.headers.set("Authorization", serverKey);
  }
};

const errorInterceptor = async (error: HTTPError) => {
  const response: KyResponse<{
    message: string;
    success: boolean;
    status: number;
  }> = error.response;
  console.error("Error:", response.status, response.url);
  const contentType = response.headers.get("content-type");
  if (!contentType) return error;
  if (contentType?.includes("application/json")) {
    const respJSON = await response.json() as {
      error?: { message: string };
      message?: string;
    };
    error.message = respJSON?.error?.message || respJSON?.message || 'Unknown error';
  } else {
    error.message = await response.text();
  }

  console.error(">>baseApi error.message:<<", error?.message);
  return error;
};

const api = baseApi.extend({
  hooks: {
    beforeRequest: [tokenInterceptor],
    beforeError: [errorInterceptor],
  },
});

export default api;
