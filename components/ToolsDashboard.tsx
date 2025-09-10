
import React, { useMemo, useState } from 'react';
import { TOOLS } from '../constants';
import { ToolCard } from './ToolCard';
import type { Tool } from '../types';
import { Notification } from './Notification';
import { UserDataSummary } from './UserDataSummary';

interface ToolsDashboardProps {
  onEditRequest: (stepIndex: number) => void;
}

export const ToolsDashboard: React.FC<ToolsDashboardProps> = ({ onEditRequest }) => {
  const [notification, setNotification] = useState<{ message: string } | null>(null);

  const groupedTools = useMemo(() => {
    return TOOLS.reduce((acc, tool) => {
      if (!acc[tool.category]) {
        acc[tool.category] = [];
      }
      acc[tool.category].push(tool);
      return acc;
    }, {} as Record<string, Tool[]>);
  }, []);
  
  const handleAction = (message: string) => {
    setNotification({ message });
  };

  return (
    <div className="space-y-12">
      {notification && <Notification message={notification.message} onClose={() => setNotification(null)} />}
      
      <UserDataSummary onEditRequest={onEditRequest} />

      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Tools & Software</h2>
        <p className="mt-2 text-lg text-slate-600">
          Find and install the tools you need to be successful in your role.
        </p>
      </div>

      {Object.entries(groupedTools).map(([category, tools]) => (
        <div key={category}>
          <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-300 pb-2 mb-6">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map(tool => (
              <ToolCard key={tool.id} tool={tool} onAction={handleAction} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
