
export interface UserProfile {
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  height: number;
  weight: number;
  targetWeight: number;
  healthConditions: string[];
  dietaryPreference: string;
  regionalPreference: string;
  activityLevel: string;
  budget: string;
  allergies: string;
  goal: string;
}

export interface Meal {
  dishName: string;
  ingredients: string[];
  nutritionalInfo: string;
  preparationTime: string;
}

export interface DailyPlan {
  day: string;
  breakfast: Meal;
  midMorningSnack: Meal;
  lunch: Meal;
  eveningSnack: Meal;
  dinner: Meal;
}

export interface Recipe {
  dishName: string;
  instructions: string[];
}

export interface ShoppingListItem {
  category: string;
  items: string[];
}

export interface MealPrepSchedule {
  sundayPrep: string[];
  dailyPrep: string[];
}

export interface MealPlan {
  userProfileSummary: string;
  dailyNutritionalTargets: string;
  sevenDayMealPlan: DailyPlan[];
  detailedRecipes: Recipe[];
  shoppingList: ShoppingListItem[];
  mealPrepSchedule: MealPrepSchedule;
  healthTips: string[];
}
