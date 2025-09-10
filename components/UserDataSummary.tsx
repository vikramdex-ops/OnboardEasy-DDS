import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { EmployeeData } from '../types';
import { ONBOARDING_STEPS } from '../constants';

interface UserDataSummaryProps {
    onEditRequest: (stepIndex: number) => void;
}

const InfoRow: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{value || 'Not provided'}</dd>
    </div>
);

export const UserDataSummary: React.FC<UserDataSummaryProps> = ({ onEditRequest }) => {
    const [employeeData] = useLocalStorage<EmployeeData>('employeeData', {
        basicInfo: {},
        idCardInfo: {},
        pfInfo: {},
    });

    const idCardStepIndex = ONBOARDING_STEPS.indexOf('ID Card');
    const pfStepIndex = ONBOARDING_STEPS.indexOf('Provident Fund');

    return (
        <div className="bg-white shadow-md shadow-slate-200/50 border border-slate-200 rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-xl font-semibold leading-6 text-gray-900">My Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    A summary of the information you provided during onboarding.
                </p>
            </div>
            <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                    {/* ID Card Information */}
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg font-medium text-gray-800">ID Card Details</h4>
                        <button
                            onClick={() => onEditRequest(idCardStepIndex)}
                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Edit Information
                        </button>
                    </div>
                    <dl className="divide-y divide-gray-100 mt-4">
                        <InfoRow label="Blood Group" value={employeeData.idCardInfo.bloodGroup} />
                        <InfoRow label="Emergency Contact" value={employeeData.idCardInfo.emergencyContactName} />
                        <InfoRow label="Emergency Contact Phone" value={employeeData.idCardInfo.emergencyContactPhone} />
                    </dl>
                </div>

                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                    {/* Provident Fund Information */}
                     <div className="flex justify-between items-center">
                        <h4 className="text-lg font-medium text-gray-800">Provident Fund Nominee</h4>
                         <button
                            onClick={() => onEditRequest(pfStepIndex)}
                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Edit Information
                        </button>
                    </div>
                    <dl className="divide-y divide-gray-100 mt-4">
                        <InfoRow label="UAN" value={employeeData.pfInfo.uan} />
                        <InfoRow label="Nominee Name" value={employeeData.pfInfo.nomineeName} />
                        <InfoRow label="Nominee Relationship" value={employeeData.pfInfo.nomineeRelationship} />
                        <InfoRow label="Nominee Date of Birth" value={employeeData.pfInfo.nomineeDob} />
                    </dl>
                </div>
            </div>
        </div>
    );
};
