
import React, { useState } from 'react';
import { DownloadIcon } from './icons/DownloadIcon';

interface WorksheetDownloaderProps {
  onComplete: () => void;
  onBack: () => void;
}

export const WorksheetDownloader: React.FC<WorksheetDownloaderProps> = ({ onComplete, onBack }) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    // In a real app, this would be a real file URL
    const fileUrl = 'data:text/plain;charset=utf-8,' + encodeURIComponent('This is your onboarding worksheet. Please complete the tasks listed inside.');
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', 'Onboarding_Worksheet.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-slate-800 mb-1">Onboarding Worksheet</h2>
      <p className="text-slate-600 mb-8 max-w-xl mx-auto">
        As a final step before accessing your tools, please download the onboarding worksheet.
        This contains a few tasks to help you get acquainted with your role and our systems.
      </p>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <DownloadIcon className="w-5 h-5" />
          Download Worksheet
        </button>

        {downloaded && <p className="text-sm text-green-700">Download started!</p>}
      </div>

      <div className="flex justify-between items-center pt-12 mt-8 border-t border-slate-200">
        <button type="button" onClick={onBack} className="px-5 py-2 text-sm font-semibold text-slate-700 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Back
        </button>
        <button
          onClick={onComplete}
          disabled={!downloaded}
          className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Finish & Go to Tools
        </button>
      </div>
    </div>
  );
};
