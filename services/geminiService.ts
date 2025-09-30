import { GoogleGenAI, Type } from "@google/genai";
import type { UserProfile, MealPlan } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using a placeholder. The app will not function correctly without a valid API key.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY_HERE" });

const mealSchema = {
    type: Type.OBJECT,
    properties: {
        dishName: { type: Type.STRING, description: "Name of the dish." },
        ingredients: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of ingredients with quantities in Indian measurements (e.g., 1 katori, 2 rotis)." },
        nutritionalInfo: { type: Type.STRING, description: "Calories, Protein, Carbs, Fats." },
        preparationTime: { type: Type.STRING, description: "e.g., '20 minutes'" }
    },
    required: ["dishName", "ingredients", "nutritionalInfo", "preparationTime"]
};

const dailyPlanSchema = {
    type: Type.OBJECT,
    properties: {
        day: { type: Type.STRING, description: "e.g., 'Day 1: Monday'" },
        breakfast: mealSchema,
        midMorningSnack: mealSchema,
        lunch: mealSchema,
        eveningSnack: mealSchema,
        dinner: mealSchema
    },
    required: ["day", "breakfast", "midMorningSnack", "lunch", "eveningSnack", "dinner"]
};

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        userProfileSummary: { type: Type.STRING, description: "Brief summary of the user's profile and goals." },
        dailyNutritionalTargets: { type: Type.STRING, description: "Calculated daily calorie and macronutrient targets." },
        sevenDayMealPlan: { type: Type.ARRAY, items: dailyPlanSchema },
        detailedRecipes: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    dishName: { type: Type.STRING },
                    instructions: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["dishName", "instructions"]
            }
        },
        shoppingList: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    category: { type: Type.STRING, description: "e.g., 'Grains & Pulses', 'Vegetables'" },
                    items: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["category", "items"]
            }
        },
        mealPrepSchedule: {
            type: Type.OBJECT,
            properties: {
                sundayPrep: { type: Type.ARRAY, items: { type: Type.STRING } },
                dailyPrep: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["sundayPrep", "dailyPrep"]
        },
        healthTips: { type: Type.ARRAY, items: { type: Type.STRING } }
    },
    required: ["userProfileSummary", "dailyNutritionalTargets", "sevenDayMealPlan", "detailedRecipes", "shoppingList", "mealPrepSchedule", "healthTips"]
};

export const generateMealPlan = async (profile: UserProfile): Promise<MealPlan> => {
    const combinedPrompt = `You are an expert Indian nutrition and dietetics AI assistant specializing in personalized meal planning for diverse Indian populations. Your role is to create customized, culturally-appropriate meal plans that respect traditional Indian dietary practices while meeting modern nutritional science standards. You will analyze user profiles, calculate nutritional needs, and generate a comprehensive 7-day meal plan including recipes, shopping lists, and meal prep guidance. Ensure all nutritional calculations are accurate, recipes are practical for Indian kitchens, and the plan is varied and balanced.

Please generate a personalized 7-day meal plan for the following user.

User Profile:
- Age: ${profile.age} years
- Gender: ${profile.gender}
- Height: ${profile.height} cm
- Weight: ${profile.weight} kg
- Target Weight: ${profile.targetWeight} kg
- Health Conditions: ${profile.healthConditions.join(', ') || 'None'}
- Dietary Preference: ${profile.dietaryPreference}
- Regional Preference: ${profile.regionalPreference}
- Activity Level: ${profile.activityLevel}
- Budget: ${profile.budget}
- Allergies: ${profile.allergies || 'None'}
- Primary Goal: ${profile.goal}
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: combinedPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
            },
        });

        const jsonText = response.text.trim();
        const mealPlanData = JSON.parse(jsonText);
        return mealPlanData as MealPlan;
    } catch (error) {
        console.error("Error generating meal plan:", error);
        throw new Error("Failed to generate meal plan. The model may have returned an invalid response. Please check your inputs and try again.");
    }
};
