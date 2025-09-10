import React from 'react';
import type { Page } from '../App';
import { OnboardEasyLogo } from './icons/OnboardEasyLogo';

interface HeaderProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    onboardingComplete: boolean;
    isEditing: boolean;
}

const navItems: { id: Page, label: string }[] = [
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'software', label: 'Software Hub' },
    { id: 'team', label: 'Team' },
];

export const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, onboardingComplete, isEditing }) => {
    // Show Onboarding tab if it's not complete, or if we are actively editing.
    const showOnboardingTab = !onboardingComplete || isEditing;

    const availableNavItems = navItems.filter(item => {
        if (item.id === 'onboarding') {
            return showOnboardingTab;
        }
        return true;
    });
    
    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex flex-shrink-0 items-center">
                            <OnboardEasyLogo className="h-8 w-auto text-orange-500" />
                            <span className="ml-3 text-2xl font-bold text-gray-800 tracking-tight">Onboard<span className="font-light text-gray-600">Easy</span></span>
                        </div>
                    </div>
                    <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                        {availableNavItems.map(item => {
                            const isDisabled = (item.id !== 'onboarding' && !onboardingComplete) && !isEditing;
                            return (
                                 <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => !isDisabled && setCurrentPage(item.id)}
                                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                                        currentPage === item.id 
                                        ? 'border-indigo-500 text-gray-900' 
                                        : 'border-transparent text-gray-500'
                                    } ${
                                        isDisabled 
                                        ? 'cursor-not-allowed opacity-50' 
                                        : 'hover:border-gray-300 hover:text-gray-700'
                                    }`}
                                    disabled={isDisabled}
                                    aria-current={currentPage === item.id ? 'page' : undefined}
                                >
                                    {item.label}
                                </button>
                            )
                        })}
                    </nav>
                </div>
            </div>
        </header>
    );
};
