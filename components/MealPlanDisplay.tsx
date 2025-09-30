import React, { useCallback } from 'react';
import type { MealPlan, DailyPlan, Meal } from '../types';
import { SectionCard } from './SectionCard';
import { DeliveryIcon } from './icons/DeliveryIcon';

const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const TargetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const RecipeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const ShoppingListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const PrepIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const HealthTipsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;

const MealCard: React.FC<{ title: string; meal: Meal }> = ({ title, meal }) => (
    <div className="border border-gray-200 rounded-lg p-4">
        <h5 className="font-semibold text-gray-800">{title}</h5>
        <p className="text-emerald-700 font-medium mt-1">{meal.dishName}</p>
        <div className="text-sm text-gray-600 mt-2">
            <p><strong>Prep Time:</strong> {meal.preparationTime}</p>
            <p><strong>Nutrition:</strong> {meal.nutritionalInfo}</p>
            <details className="mt-2">
                <summary className="cursor-pointer font-medium text-emerald-600 hover:text-emerald-800">Ingredients</summary>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                    {meal.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                </ul>
            </details>
        </div>
    </div>
);

const DailyPlanCard: React.FC<{ plan: DailyPlan }> = ({ plan }) => (
    <details className="mb-4 bg-white rounded-lg shadow-sm border border-gray-200 open:ring-2 open:ring-emerald-200">
        <summary className="p-4 cursor-pointer font-bold text-lg text-gray-700">{plan.day}</summary>
        <div className="p-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MealCard title="Breakfast" meal={plan.breakfast} />
            <MealCard title="Mid-Morning Snack" meal={plan.midMorningSnack} />
            <MealCard title="Lunch" meal={plan.lunch} />
            <MealCard title="Evening Snack" meal={plan.eveningSnack} />
            <MealCard title="Dinner" meal={plan.dinner} />
        </div>
    </details>
);

export const MealPlanDisplay: React.FC<{ plan: MealPlan }> = ({ plan }) => {
  const handleOrderIngredients = useCallback(() => {
    const allItems = plan.shoppingList.flatMap(category => category.items);
    // Remove quantities in brackets for a cleaner search query, e.g., "Onion (2 large)" -> "Onion"
    const cleanedItems = allItems.map(item => item.replace(/ *\([^)]*\) */g, "").trim());
    const query = `buy groceries ${cleanedItems.join(', ')}`;
    const encodedQuery = encodeURIComponent(query);
    const url = `https://www.google.com/search?q=${encodedQuery}&tbm=shop`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [plan.shoppingList]);

  return (
    <div className="mt-10">
      <SectionCard title="User Profile Summary" icon={<UserIcon />}>
        <p className="text-gray-600">{plan.userProfileSummary}</p>
      </SectionCard>

      <SectionCard title="Daily Nutritional Targets" icon={<TargetIcon />}>
        <p className="text-gray-600 font-medium">{plan.dailyNutritionalTargets}</p>
      </SectionCard>

      <SectionCard title="7-Day Meal Plan" icon={<CalendarIcon />}>
        {plan.sevenDayMealPlan.map(dailyPlan => <DailyPlanCard key={dailyPlan.day} plan={dailyPlan} />)}
      </SectionCard>

      <SectionCard title="Detailed Recipes" icon={<RecipeIcon />}>
        {plan.detailedRecipes.map(recipe => (
          <details key={recipe.dishName} className="mb-3">
            <summary className="font-semibold text-lg text-emerald-700 cursor-pointer">{recipe.dishName}</summary>
            <ol className="list-decimal pl-6 mt-2 space-y-1 text-gray-600">
              {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
          </details>
        ))}
      </SectionCard>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Shopping List" icon={<ShoppingListIcon />}>
            {plan.shoppingList.map(category => (
            <div key={category.category} className="mb-4">
                <h4 className="font-semibold text-gray-800 text-lg border-b pb-1 mb-2">{category.category}</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                {category.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
            ))}
            <div className="mt-6">
                <button 
                    onClick={handleOrderIngredients}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
                >
                    <DeliveryIcon className="w-5 h-5" />
                    Order Ingredients via Delivery App
                </button>
            </div>
        </SectionCard>
        
        <SectionCard title="Meal Prep Schedule" icon={<PrepIcon />}>
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 text-lg border-b pb-1 mb-2">Sunday Prep</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              {plan.mealPrepSchedule.sundayPrep.map((task, i) => <li key={i}>{task}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 text-lg border-b pb-1 mb-2">Daily Quick Prep</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              {plan.mealPrepSchedule.dailyPrep.map((task, i) => <li key={i}>{task}</li>)}
            </ul>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Health Tips & Reminders" icon={<HealthTipsIcon />}>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          {plan.healthTips.map((tip, i) => <li key={i}>{tip}</li>)}
        </ul>
      </SectionCard>
    </div>
  );
};
