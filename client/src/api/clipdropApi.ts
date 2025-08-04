import api from "./baseApi";

export interface GenerateImageRequest {
  prompt: string;
}

export interface GenerateImageResponse {
  imageUrl: string;
}

export interface GenerateImageWithDescriptionRequest {
  prompt: string;
}

export interface GenerateImageWithDescriptionResponse {
  imageUrl: string;
  title: string;
  description: string;
}

export const clipdropApi = {
  generateImage: async (
    data: GenerateImageRequest
  ): Promise<GenerateImageResponse> => {
    return api.post("clipdrop/generate-image", { json: data }).json();
  },

  generateImageWithDescription: async (
    data: GenerateImageWithDescriptionRequest
  ): Promise<GenerateImageWithDescriptionResponse> => {
    return api
      .post("clipdrop/generate-image-with-description", { json: data })
      .json();
  },
}; 