import api from "./baseApi";

export interface GenerateTitleAndDescriptionRequest {
  prompt: string;
  imageUrl: string;
}

export interface GenerateTitleAndDescriptionResponse {
  title: string;
  description: string;
}

export const openaiApi = {
  generateTitleAndDescription: async (
    data: GenerateTitleAndDescriptionRequest
  ): Promise<GenerateTitleAndDescriptionResponse> => {
    return api.post("openai/title-description", { json: data }).json();
  },
}; 