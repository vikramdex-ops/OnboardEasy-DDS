import React, { useState } from 'react';
import type { Tool } from '../types';
import { ToolActionType } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';
import { TicketIcon } from './icons/TicketIcon';
import { KeyIcon } from './icons/KeyIcon';
import { ConfirmationModal } from './ConfirmationModal';

interface ToolCardProps {
  tool: Tool;
  onAction: (message: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onAction }) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    action: (() => void) | null;
  }>({
    isOpen: false,
    title: '',
    message: '',
    action: null,
  });

  const handleDirectDownload = () => {
    if (tool.downloadUrl && tool.downloadUrl !== '#') {
      onAction(`Redirecting to download page for ${tool.name}...`);
      window.open(tool.downloadUrl, '_blank', 'noopener,noreferrer');
    } else {
      onAction(`Download for ${tool.name} is not available. Please contact IT.`);
    }
  };

  const handleRequestIT = () => {
    setModalState({
      isOpen: true,
      title: 'Confirm Installation Request',
      message: `Are you sure you want to raise a ticket with IT for the installation of ${tool.name}? This will notify the IT team.`,
      action: () => onAction(`A ticket has been raised with IT for the installation of ${tool.name}.`),
    });
  };

  const handleRequestLicense = () => {
     setModalState({
      isOpen: true,
      title: 'Confirm License Request',
      message: `Are you sure you want to request a license for ${tool.name}? This will notify the Admin team.`,
      action: () => onAction(`A license request for ${tool.name} has been sent to the Admin team.`),
    });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, title: '', message: '', action: null });
  };

  const handleConfirm = () => {
    if (modalState.action) {
      modalState.action();
    }
  };


  const renderActions = () => {
    switch (tool.actionType) {
      case ToolActionType.DIRECT_DOWNLOAD:
        return (
          <button 
            onClick={handleDirectDownload}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
            <DownloadIcon className="w-4 h-4" />
            Install
          </button>
        );
      case ToolActionType.REQUEST_IT:
        return (
          <button 
            onClick={handleRequestIT}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            <TicketIcon className="w-4 h-4" />
            Request Installation
          </button>
        );
      case ToolActionType.REQUEST_LICENSE:
        return (
          <div className="flex gap-2">
            <button 
              onClick={handleDirectDownload}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-slate-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700">
               <DownloadIcon className="w-4 h-4" />
              Install
            </button>
            <button 
              onClick={handleRequestLicense}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
               <KeyIcon className="w-4 h-4" />
              Request License
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
        <div className="bg-white rounded-xl shadow-md shadow-slate-200/50 border border-slate-200 flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="p-6 flex-grow">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-slate-100">
                    <tool.logo className="h-8 w-8 text-slate-600"/>
                </div>
                <div>
                    <h4 className="text-lg font-bold text-slate-800">{tool.name}</h4>
                    <p className="text-xs text-slate-500">
                    v{tool.version} (Updated: {tool.lastUpdated})
                    </p>
                </div>
            </div>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            {tool.description}
            </p>
        </div>
        <div className="bg-slate-50 p-4 rounded-b-xl">
            {renderActions()}
        </div>
        </div>
        <ConfirmationModal
            isOpen={modalState.isOpen}
            onClose={closeModal}
            onConfirm={handleConfirm}
            title={modalState.title}
            message={modalState.message}
        />
    </>
  );
};