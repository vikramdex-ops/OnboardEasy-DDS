
import React, 'react';
import type { BasicInfo } from '../types';
import { Tooltip } from './Tooltip';

interface EmployeeFormProps {
  onComplete: () => void;
  onBack: () => void;
  onDataChange: (data: BasicInfo) => void;
  initialData: BasicInfo;
}

const InputField = ({ id, label, value, ...props } : {id: string, label: string, value: string | undefined} & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-slate-900">{label}</label>
        <div className="mt-2">
            <input id={id} name={id} value={value || ''} className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" {...props} />
        </div>
    </div>
);

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ onComplete, onBack, onDataChange, initialData }) => {
  const [formData, setFormData] = React.useState<BasicInfo>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDataChange(formData);
    onComplete();
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-1">Your Information</h2>
      <p className="text-slate-600 mb-6">Please provide your basic details for our records.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField id="fullName" label="Full Name" type="text" value={formData.fullName} onChange={handleChange} required autoComplete="name"/>
            
            <div>
              <div className="flex items-center">
                <label htmlFor="employeeId" className="block text-sm font-medium leading-6 text-slate-900">
                  Employee ID <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <Tooltip text="Your unique identifier within the company. This will be assigned by HR if you don't have one yet." />
              </div>
              <div className="mt-2">
                <input id="employeeId" name="employeeId" type="text" value={formData.employeeId || ''} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <InputField id="department" label="Department" type="text" value={formData.department} onChange={handleChange} required/>
            <InputField id="jobTitle" label="Job Title" type="text" value={formData.jobTitle} onChange={handleChange} required/>

            <div>
              <div className="flex items-center">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900">
                  Company Email <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <Tooltip text="Your official company email address. If you haven't received it yet, please contact your manager." />
              </div>
              <div className="mt-2">
                <input id="email" name="email" type="email" value={formData.email || ''} onChange={handleChange} autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Example format: <code className="font-mono bg-slate-200 text-slate-800 text-xs px-1 py-0.5 rounded">YourName.dexterity@gmail.com</code>
              </p>
            </div>

            <InputField id="phone" label="Phone Number" type="tel" value={formData.phone} onChange={handleChange} required autoComplete="tel"/>
        </div>
        <div className="flex justify-between items-center pt-4">
          <button type="button" onClick={onBack} className="px-5 py-2 text-sm font-semibold text-slate-700 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Back
          </button>
          <button type="submit" className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};