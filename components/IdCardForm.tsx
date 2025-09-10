
import React, { useState } from 'react';
import type { IdCardInfo } from '../types';
import { UserCircleIcon } from './icons/UserCircleIcon';

interface IdCardFormProps {
  onComplete: () => void;
  onBack: () => void;
  onDataChange: (data: IdCardInfo) => void;
  initialData: IdCardInfo;
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

export const IdCardForm: React.FC<IdCardFormProps> = ({ onComplete, onBack, onDataChange, initialData, isEditMode = false }) => {
  const [formData, setFormData] = useState<IdCardInfo>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photoPreview: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a secure API call to the backend.
    onDataChange(formData);
    onComplete();
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-1">ID Card Information</h2>
      <p className="text-slate-600 mb-6">This information will be printed on your official employee ID card.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="col-span-full">
            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-slate-900">Photo</label>
            <div className="mt-2 flex items-center gap-x-3">
                {formData.photoPreview ? 
                    <img src={formData.photoPreview} alt="Preview" className="h-24 w-24 rounded-full object-cover" /> :
                    <UserCircleIcon className="h-24 w-24 text-slate-300" aria-hidden="true" />
                }
                <input type="file" id="photo" name="photo" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                <label htmlFor="photo" className="cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">Change</label>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="bloodGroup" className="block text-sm font-medium leading-6 text-slate-900">Blood Group</label>
              <div className="mt-2">
                <select id="bloodGroup" name="bloodGroup" value={formData.bloodGroup || ''} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option>Select...</option>
                    <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                    <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
                </select>
              </div>
            </div>
            <div></div>
            <InputField id="emergencyContactName" label="Emergency Contact Name" type="text" value={formData.emergencyContactName} onChange={handleChange} required/>
            <InputField id="emergencyContactPhone" label="Emergency Contact Phone" type="tel" value={formData.emergencyContactPhone} onChange={handleChange} required/>
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