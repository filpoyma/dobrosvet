import api from "./baseApi.ts";

const MidjourneyApi = {
  basePath: "midjourney",

  getUrl(path: string = "") {
    return path ? `${this.basePath}/${path}` : this.basePath;
  },

  generateImage(prompt: string): Promise<{ imageUrl: string }> {
    return api.post(this.getUrl("generate-image"), { json: prompt }).json();
  },

  generateImageWithDescription(
    prompt: string
  ): Promise<{ imageUrl: string; title: string; description: string }> {
    return api
      .post(this.getUrl("generate-image-with-description"), { json: prompt })
      .json();
  },
};

export default MidjourneyApi;
