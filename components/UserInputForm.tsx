
import React, { useState } from 'react';
import type { UserProfile } from '../types';
import { HEALTH_CONDITIONS, DIETARY_PREFERENCES, REGIONAL_PREFERENCES, ACTIVITY_LEVELS, BUDGETS, GENDERS } from '../constants';
import { LeafIcon } from './icons/LeafIcon';

interface UserInputFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

export const UserInputForm: React.FC<UserInputFormProps> = ({ onSubmit, isLoading }) => {
  const [profile, setProfile] = useState<UserProfile>({
    age: 32,
    gender: 'Female',
    height: 160,
    weight: 68,
    targetWeight: 58,
    healthConditions: ['PCOD/PCOS'],
    dietaryPreference: 'Vegetarian (Lacto)',
    regionalPreference: 'North Indian',
    activityLevel: 'Moderate',
    budget: 'Mid-range (₹200-400/day)',
    allergies: '',
    goal: 'Weight loss and hormone balance',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value === '' ? 0 : parseInt(value, 10) }));
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, options } = e.target;
    // Fix: Explicitly cast `o` to `HTMLOptionElement` to resolve TypeScript error where `o` was
    // being inferred as `unknown`, preventing access to `selected` and `value` properties.
    const selectedOptions = Array.from(options)
      .filter(o => (o as HTMLOptionElement).selected)
      .map(o => (o as HTMLOptionElement).value);
    setProfile(prev => ({ ...prev, [name]: selectedOptions }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="text-center mb-8">
        <LeafIcon className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
        <h2 className="text-3xl font-bold text-gray-800">Your Personalized Meal Planner</h2>
        <p className="text-gray-500 mt-2">Fill in your details to get a custom Indian diet plan.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Personal Details */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
            <input type="number" name="age" id="age" value={profile.age} onChange={handleNumberChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <select name="gender" id="gender" value={profile.gender} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
              {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input type="number" name="height" id="height" value={profile.height} onChange={handleNumberChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input type="number" name="weight" id="weight" value={profile.weight} onChange={handleNumberChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="targetWeight" className="block text-sm font-medium text-gray-700">Target Weight (kg)</label>
            <input type="number" name="targetWeight" id="targetWeight" value={profile.targetWeight} onChange={handleNumberChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700">Activity Level</label>
            <select name="activityLevel" id="activityLevel" value={profile.activityLevel} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
              {ACTIVITY_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="dietaryPreference" className="block text-sm font-medium text-gray-700">Dietary Preference</label>
            <select name="dietaryPreference" id="dietaryPreference" value={profile.dietaryPreference} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
              {DIETARY_PREFERENCES.map(pref => <option key={pref} value={pref}>{pref}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="regionalPreference" className="block text-sm font-medium text-gray-700">Regional Preference</label>
            <select name="regionalPreference" id="regionalPreference" value={profile.regionalPreference} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
              {REGIONAL_PREFERENCES.map(pref => <option key={pref} value={pref}>{pref}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget</label>
            <select name="budget" id="budget" value={profile.budget} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
              {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="lg:col-span-3">
             <label htmlFor="healthConditions" className="block text-sm font-medium text-gray-700">Health Conditions</label>
             <select multiple name="healthConditions" id="healthConditions" value={profile.healthConditions} onChange={handleMultiSelectChange} className="mt-1 block w-full h-32 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
              {HEALTH_CONDITIONS.map(cond => <option key={cond} value={cond}>{cond}</option>)}
            </select>
             <p className="mt-2 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple.</p>
          </div>
           <div className="lg:col-span-3">
            <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Allergies (comma-separated)</label>
            <input type="text" name="allergies" id="allergies" value={profile.allergies} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" placeholder="e.g., Peanuts, Gluten" />
          </div>
          <div className="lg:col-span-3">
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Primary Goal</label>
            <textarea name="goal" id="goal" value={profile.goal} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" placeholder="e.g., Sustainable weight loss, muscle gain, better diabetic control" required></textarea>
          </div>
        </div>
        <div className="pt-5">
          <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-emerald-300 disabled:cursor-not-allowed transition-colors">
            {isLoading ? 'Generating...' : 'Generate My Meal Plan'}
          </button>
        </div>
      </form>
    </div>
  );
};
