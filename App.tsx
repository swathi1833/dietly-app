
import React, { useState, useCallback } from 'react';
import { UserInputForm } from './components/UserInputForm';
import { MealPlanDisplay } from './components/MealPlanDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { generateMealPlan } from './services/geminiService';
import type { UserProfile, MealPlan } from './types';

function App() {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlan = useCallback(async (profile: UserProfile) => {
    setIsLoading(true);
    setError(null);
    setMealPlan(null);
    try {
      const plan = await generateMealPlan(profile);
      setMealPlan(plan);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <UserInputForm onSubmit={handleGeneratePlan} isLoading={isLoading} />
        
        <div className="mt-8">
            {isLoading && <LoadingSpinner />}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            {mealPlan && !isLoading && <MealPlanDisplay plan={mealPlan} />}
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-gray-500">
        <p>Powered by AI. Always consult with a healthcare professional for medical advice.</p>
      </footer>
    </div>
  );
}

export default App;
