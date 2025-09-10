
import React, { useState } from 'react';
import type { PfInfo } from '../types';

interface PfFormProps {
  onComplete: () => void;
  onBack: () => void;
  onDataChange: (data: PfInfo) => void;
  initialData: PfInfo;
  isEditMode?: boolean;
}

const InputField = ({ id, label, value, ...props } : {id: string, label: string, value: string | undefined} & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-slate-900">{label}</label>
        <div className="mt-2">
            <input id={id} name={id} value={value || ''} className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" {...props} />
        </div>
    </div>
);

export const PfForm: React.FC<PfFormProps> = ({ onComplete, onBack, onDataChange, initialData, isEditMode = false }) => {
  const [formData, setFormData] = useState<PfInfo>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value as 'yes' | 'no'}));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a secure API call to the backend.
    // If hasUan is 'no', it would create a ticket for HR.
    onDataChange(formData);
    onComplete();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-1">Provident Fund (PF) Nomination</h2>
      <p className="text-slate-600 mb-6">Please provide your PF details and nominee information.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label className="text-base font-semibold text-gray-900">Do you already have a UAN (Universal Account Number)?</label>
          <fieldset className="mt-4">
            <legend className="sr-only">UAN status</legend>
            <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
              <div className="flex items-center">
                <input id="hasUanYes" name="hasUan" type="radio" value="yes" onChange={handleRadioChange} checked={formData.hasUan === 'yes'} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                <label htmlFor="hasUanYes" className="ml-3 block text-sm font-medium leading-6 text-gray-900">Yes, I have a UAN</label>
              </div>
              <div className="flex items-center">
                <input id="hasUanNo" name="hasUan" type="radio" value="no" onChange={handleRadioChange} checked={formData.hasUan === 'no'} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                <label htmlFor="hasUanNo" className="ml-3 block text-sm font-medium leading-6 text-gray-900">No, I need one created</label>
              </div>
            </div>
          </fieldset>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
          {formData.hasUan === 'yes' && (
             <InputField id="uan" label="UAN (Universal Account Number)" type="text" value={formData.uan} onChange={handleChange} required/>
          )}

          {formData.hasUan === 'no' && (
            <>
              <div className="sm:col-span-2 p-4 rounded-md bg-blue-50 border border-blue-200">
                <p className="text-sm text-blue-800">Please provide the following details. A ticket will be created for our HR team to generate a new UAN for you.</p>
              </div>
              <InputField id="emailForPf" label="Personal Email" type="email" value={formData.emailForPf} onChange={handleChange} required/>
              <InputField id="phoneForPf" label="Personal Phone Number" type="tel" value={formData.phoneForPf} onChange={handleChange} required/>
              <InputField id="aadhaar" label="Aadhaar Card Number" type="text" value={formData.aadhaar} onChange={handleChange} required/>
              <div></div> {/* Spacer */}
              <InputField id="bankAccount" label="Bank Account Number" type="text" value={formData.bankAccount} onChange={handleChange} required/>
              <InputField id="ifscCode" label="IFSC Code" type="text" value={formData.ifscCode} onChange={handleChange} required/>
            </>
          )}
        </div>

        <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-800">Nominee Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <InputField id="nomineeName" label="Nominee Full Name" type="text" value={formData.nomineeName} onChange={handleChange} required />
              <InputField id="nomineeRelationship" label="Relationship with Nominee" type="text" value={formData.nomineeRelationship} onChange={handleChange} required />
              <InputField id="nomineeDob" label="Nominee Date of Birth" type="date" value={formData.nomineeDob} onChange={handleChange} required />
            </div>
        </div>


        <div className="mt-6 p-4 border-l-4 border-yellow-400 bg-yellow-50">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3">
                    <p className="text-sm text-yellow-700">In a real application, this sensitive data would be securely transmitted to our HR system. Do not enter real data here.</p>
                </div>
            </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <button type="button" onClick={onBack} className="px-5 py-2 text-sm font-semibold text-slate-700 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {isEditMode ? 'Cancel' : 'Back'}
          </button>
          <button type="submit" className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {isEditMode ? 'Update Information' : 'Save and Continue'}
          </button>
        </div>
      </form>
    </div>
  );
};