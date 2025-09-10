import React, { useState, useEffect } from 'react';
import { TEAM_MEMBERS } from '../constants';
import type { TeamMember } from '../types';
import { IdentificationIcon } from './icons/IdentificationIcon';
import { EnvelopeIcon } from './icons/EnvelopeIcon';

export const TeamPage: React.FC = () => {
  const [allMembers, setAllMembers] = useState<TeamMember[]>(TEAM_MEMBERS);

  useEffect(() => {
    // In a real application, this would be an API call to fetch all team members.
    // For this prototype, we combine a static list with a dynamic list from localStorage.
    try {
      const dynamicMembers: TeamMember[] = JSON.parse(localStorage.getItem('dynamicTeam') || '[]');
      
      // Combine static and dynamic members, ensuring no duplicates based on ID.
      const combined = [
        ...TEAM_MEMBERS, 
        ...dynamicMembers.filter(dm => !TEAM_MEMBERS.some(tm => tm.id === dm.id))
      ];
      
      setAllMembers(combined);
    } catch (error) {
      console.error("Failed to load dynamic team members from localStorage:", error);
      setAllMembers(TEAM_MEMBERS); // Fallback to static list on error
    }
  }, []);


  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl lg:mx-0 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet the Team</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Get to know the talented individuals you'll be collaborating with every day.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {allMembers.map((person) => (
            <li 
              key={person.id}
              className="flex flex-col text-center rounded-2xl bg-white shadow-lg shadow-slate-200/60 border border-slate-200 p-8 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
            >
              <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full object-cover" src={person.imageUrl} alt={`Photo of ${person.name}`} />
              <div className="flex-grow mt-6">
                <h3 className="text-xl font-bold tracking-tight text-gray-900">{person.name}</h3>
                <p className="text-base font-semibold text-indigo-600">{person.role}</p>
                <p className="text-sm text-gray-500">{person.department}</p>
              </div>

              {(person.employeeId || person.email) && (
                <ul role="list" className="mt-6 flex flex-col gap-y-3 border-t border-gray-200 pt-6">
                  {person.employeeId && (
                    <li className="flex items-center justify-center gap-x-3">
                      <IdentificationIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                      <span className="text-sm text-gray-700 font-medium">{person.employeeId}</span>
                    </li>
                  )}
                  {person.email && (
                    <li className="flex items-center justify-center gap-x-3">
                      <EnvelopeIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                      <a href={`mailto:${person.email}`} className="text-sm text-gray-700 hover:text-indigo-600 truncate">{person.email}</a>
                    </li>
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};