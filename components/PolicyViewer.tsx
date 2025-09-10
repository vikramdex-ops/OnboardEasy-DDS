import React, { useState } from 'react';
import { POLICIES } from '../constants';
import { EyeIcon } from './icons/EyeIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface PolicyViewerProps {
  onComplete: () => void;
}

export const PolicyViewer: React.FC<PolicyViewerProps> = ({ onComplete }) => {
  const [checkedState, setCheckedState] = useState<Record<number, boolean>>(
    POLICIES.reduce((acc, policy) => ({ ...acc, [policy.id]: false }), {})
  );

  const handleCheckboxChange = (policyId: number) => {
    setCheckedState(prev => ({ ...prev, [policyId]: !prev[policyId] }));
  };

  const allPoliciesAgreed = Object.values(checkedState).every(Boolean);

  const handleDownload = (policyTitle: string) => {
    const fileUrl = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`Dummy PDF for ${policyTitle}`);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', `${policyTitle.replace(/\s+/g, '_')}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
        <div className="border-b border-gray-200 pb-5 mb-8">
            <h2 className="text-base font-semibold leading-6 text-gray-900 flex items-center">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white mr-3" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                </span>
                1. Review Company Policies
            </h2>
        </div>
      <div className="space-y-4">
        {POLICIES.map(policy => (
          <div key={policy.id} className="bg-slate-50 p-6 rounded-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{policy.title}</h3>
                <p className="mt-1 text-sm text-gray-600 max-w-xl">{policy.description}</p>
                <p className="mt-2 text-xs text-gray-400">Version: {policy.version}</p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0 flex items-center gap-x-2">
                <a href={policy.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <EyeIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
                  View
                </a>
                <button type="button" onClick={() => handleDownload(policy.title)} className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <DownloadIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
                  Download
                </button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center">
                <input
                  id={`policy-agree-${policy.id}`}
                  name={`policy-agree-${policy.id}`}
                  type="checkbox"
                  checked={checkedState[policy.id]}
                  onChange={() => handleCheckboxChange(policy.id)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor={`policy-agree-${policy.id}`} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                  I have read and understood this policy.
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
       <div className="mt-8 flex justify-end">
            <button
                type="button"
                onClick={onComplete}
                disabled={!allPoliciesAgreed}
                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Acknowledge & Continue
            </button>
        </div>
    </div>
  );
};