
import { GoogleGenAI } from "@google/genai";
import { PatternOptions, PaletteKey } from "../types";
import { colorPalettes } from '../constants';

// This is a helper function that can run client-side to generate the prompt.
export const generatePrompt = (options: PatternOptions): string => {
    const palette = colorPalettes[options.palette as PaletteKey];
    const colorString = palette.join(', ');

    return `Create a seamless SVG pattern with a ${options.background} background. The pattern should feature ${options.style} style ${options.subjects.join(', ')} as the main subjects, with accent motifs of ${options.motifs}. Arrange the elements in a ${options.layout} layout with a density level of ${options.density}/10. The color palette should be based on these colors: ${colorString}. The pattern should have a ${options.border} border.`;
};

// This function calls the Gemini API to generate the SVG pattern.
export const getPattern = async (prompt: string): Promise<string> => {
    // FIX: Initialize GoogleGenAI with API key from environment variables as per guidelines.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

    try {
        const response = await ai.models.generateContent({
            // FIX: Use a model suitable for complex text tasks (like generating SVG code).
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                // FIX: Use systemInstruction to provide strong context to the model for better results.
                systemInstruction: "You are an expert SVG pattern generator. Your response must be ONLY the SVG code, without any markdown, comments, or other text. The SVG should be well-formed, scalable, and seamless. Do not include an XML declaration. The <svg> tag should be the root element. Use a viewBox that makes the pattern tileable, e.g., '0 0 100 100'. Ensure the generated SVG code is a single block of text.",
                // Ensure the response is plain text to be used as SVG source.
                responseMimeType: "text/plain",
            }
        });

        // FIX: Extract text directly from the response object as per guidelines.
        const svgContent = response.text.trim();
        
        if (!svgContent.startsWith('<svg')) {
            console.error("Received invalid SVG content:", svgContent);
            throw new Error('The AI did not return valid SVG code. Please try a different prompt.');
        }

        return svgContent;

    } catch (error) {
        console.error("Error generating pattern with Gemini:", error);
        throw new Error("Failed to communicate with the AI service. Please check your connection and API key.");
    }
};
