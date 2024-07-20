import apiClient from "./apiClient";

const translateText = async (text, toLanguage) => {
  try {
    const body = {
      Provider: "AWS",
      Service: "Translate",
      text: text,
      target_language: toLanguage,
    };
    const response = await apiClient.post("", body);
    return response.data.response.translated_text; // Ensure this matches the API response structure
  } catch (error) {
    console.error("Error translating text:", error);
    throw error;
  }
};

const textToSpeech = async (text, voice_id) => {
  try {
    const body = {
      Provider: "AWS",
      Service: "TTS",
      text: text,
      voice_id,
    };
    const response = await apiClient.post("", body);
    return response.data.response.file_url; // Ensure this matches the API response structure
  } catch (error) {
    console.error("Error translating text:", error);
    throw error;
  }
};

const comprehrend = async (text, operation) => {
  try {
    const body = {
      Provider: "AWS",
      Service: "Comprehend",
      text: text,
      operation,
    };
    const response = await apiClient.post("", body);

    if (operation === "sentiment")
      return response?.data?.response?.response?.sentiment;
    else if (operation === "entities")
      return response?.data?.response?.Entities;
    // operation === "language"
    else return response.data.response.file_url; // Ensure this matches the API response structure
  } catch (error) {
    console.error("Error translating text:", error);
    throw error;
  }
};

export { translateText, textToSpeech, comprehrend };
