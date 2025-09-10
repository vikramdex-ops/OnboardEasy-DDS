
import React from 'react';
import { QuestionMarkCircleIcon } from './icons/QuestionMarkCircleIcon';

interface TooltipProps {
  text: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  return (
    <div className="relative flex items-center group ml-2">
      <QuestionMarkCircleIcon className="w-4 h-4 text-slate-400 cursor-help" />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs p-2.5 text-xs text-white bg-slate-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
        {text}
        <svg className="absolute text-slate-700 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
        </svg>
      </div>
    </div>
  );
};