import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { PolicyViewer } from './PolicyViewer';
import { EmployeeForm } from './EmployeeForm';
import { IdCardForm } from './IdCardForm';
import { PfForm } from './PfForm';
import { WorksheetDownloader } from './WorksheetDownloader';
import type { EmployeeData, TeamMember } from '../types';
import { ONBOARDING_STEPS } from '../constants';

interface OnboardingProcessProps {
    onOnboardingFinish: (isCompleted: boolean) => void;
    editModeStep?: number | null;
}

export const OnboardingProcess: React.FC<OnboardingProcessProps> = ({ onOnboardingFinish, editModeStep = null }) => {
    const isEditMode = editModeStep !== null;
    const [storedStep, setStoredStep] = useLocalStorage<number>('onboardingStep', 0);
    const [currentStep, setCurrentStep] = useState(isEditMode ? editModeStep : storedStep);
    
    const [employeeData, setEmployeeData] = useLocalStorage<EmployeeData>('employeeData', {
        basicInfo: {},
        idCardInfo: {},
        pfInfo: {},
    });

    useEffect(() => {
        if (!isEditMode) {
            setStoredStep(currentStep);
        }
    }, [currentStep, isEditMode, setStoredStep]);

    const updateEmployeeData = useCallback((section: keyof EmployeeData, data: any) => {
        setEmployeeData(prev => ({ ...prev, [section]: data }));
    }, [setEmployeeData]);

    const nextStep = useCallback(() => {
        if (currentStep < ONBOARDING_STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    }, [currentStep]);

    const prevStep = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }, [currentStep]);

    const handleFinish = () => {
        // Create/update the dynamic team member profile upon finishing the process.
        // This ensures all data, including the ID photo, is available.
        if (!isEditMode) {
            const { basicInfo, idCardInfo } = employeeData;
            // Name, job title, and department are required by the form.
            if (basicInfo.fullName && basicInfo.jobTitle && basicInfo.department) {
                const teamMemberId = basicInfo.fullName.replace(/\s+/g, '-').toLowerCase();
                
                const newMember: TeamMember = {
                    id: teamMemberId,
                    name: basicInfo.fullName,
                    employeeId: basicInfo.employeeId, // Can be undefined
                    role: basicInfo.jobTitle,
                    department: basicInfo.department,
                    email: basicInfo.email || '', // Email can be an empty string
                    imageUrl: idCardInfo.photoPreview || `https://i.pravatar.cc/800?u=${teamMemberId}`,
                };
                
                try {
                    const teamList: TeamMember[] = JSON.parse(localStorage.getItem('dynamicTeam') || '[]');
                    const existingIndex = teamList.findIndex(member => member.id === newMember.id);
                    
                    if (existingIndex > -1) {
                        teamList[existingIndex] = newMember;
                    } else {
                        teamList.push(newMember);
                    }
                    localStorage.setItem('dynamicTeam', JSON.stringify(teamList));
                } catch (error) {
                    console.error("Failed to update dynamic team list in localStorage:", error);
                }
            }
        }
        onOnboardingFinish(!isEditMode);
    };

    const handleCancelEdit = () => {
        onOnboardingFinish(false);
    }

    const renderCurrentStep = useMemo(() => {
        const stepName = ONBOARDING_STEPS[currentStep] || ONBOARDING_STEPS[0];
        
        switch (stepName) {
            case 'Review Company Policies':
                return <PolicyViewer onComplete={nextStep} />;
            case 'Your Information':
                return <EmployeeForm onComplete={nextStep} onBack={prevStep} onDataChange={(data) => updateEmployeeData('basicInfo', data)} initialData={employeeData.basicInfo} />;
            case 'ID Card':
                return <IdCardForm onComplete={isEditMode ? handleFinish : nextStep} onBack={isEditMode ? handleCancelEdit : prevStep} onDataChange={(data) => updateEmployeeData('idCardInfo', data)} initialData={employeeData.idCardInfo} isEditMode={isEditMode} />;
            case 'Provident Fund':
                return <PfForm onComplete={isEditMode ? handleFinish : nextStep} onBack={isEditMode ? handleCancelEdit : prevStep} onDataChange={(data) => updateEmployeeData('pfInfo', data)} initialData={employeeData.pfInfo} isEditMode={isEditMode} />;
            case 'Worksheet':
                return <WorksheetDownloader onComplete={handleFinish} onBack={prevStep} />;
            default:
                return <PolicyViewer onComplete={nextStep} />;
        }
    }, [currentStep, nextStep, prevStep, updateEmployeeData, employeeData, handleFinish, isEditMode, handleCancelEdit]);
    
    return (
        <div className="mx-auto max-w-5xl py-10 sm:px-6 lg:px-8">
            <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200">
                {renderCurrentStep}
            </div>
        </div>
    );
};