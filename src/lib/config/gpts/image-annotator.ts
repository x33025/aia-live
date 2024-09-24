import  openai  from '$lib/config/open-ai'; // Import OpenAI from your implementation path

class ImageAnnotator {
  // Method to analyze an image by URL
  async analyzeImage(imageUrl: string, question: string = "Describe what you see in the image in 150 characters or less.") {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Use the relevant GPT-4 model
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: question },  // Customizable question
              {
                type: "image_url",
                image_url: { url: imageUrl },     // Image URL to be analyzed
              },
            ],
          },
        ],
      });

      console.log("Response:", response.choices[0]);
      return response.choices[0];
    } catch (error) {
      console.error("Error analyzing the image:", error);
      throw error;
    }
  }
}

export default ImageAnnotator;
