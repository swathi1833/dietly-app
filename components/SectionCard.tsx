
import React from 'react';

interface SectionCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
      <div className="bg-gray-50 p-4 border-b border-gray-200 rounded-t-lg">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          {icon && <span className="mr-3 text-emerald-600">{icon}</span>}
          {title}
        </h3>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
