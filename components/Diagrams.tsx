/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Info, User, ChevronDown } from 'lucide-react';

// --- DATA FROM PAPER (Approximate means from Fig 3 & 4) ---
// Angles in degrees
const DATA = {
    standing: {
        'FM-C2': { neutral: 28.24, texting: 17.96 },
        'C1-C2': { neutral: 29.44, texting: 21.59 },
        'C3-C4': { neutral: 7.14, texting: 4.14 },
        'AOL':   { neutral: 12.35, texting: 10.46 }
    },
    sitting: {
        'FM-C2': { neutral: 28.08, texting: 17.13 },
        'C1-C2': { neutral: 28.15, texting: 21.11 },
        'C3-C4': { neutral: 6.24, texting: 4.32 },
        'AOL':   { neutral: 9.76, texting: 11.45 }
    }
};

type SegmentKey = keyof typeof DATA['standing'];

const SEGMENT_DESCRIPTIONS: Record<SegmentKey, string> = {
    'FM-C2': 'Occipito-Cervical (Upper Neck)',
    'C1-C2': 'Atlanto-Axial (Rotation Unit)',
    'C3-C4': 'Mid-Cervical Segment',
    'AOL': 'Overall Angle of Lordosis'
};

export const AngleComparisonChart: React.FC = () => {
  const [posture, setPosture] = useState<'standing' | 'sitting'>('sitting');
  
  const currentData = DATA[posture];
  const segments = Object.keys(currentData) as SegmentKey[];

  return (
    <div className="flex flex-col lg:flex-row items-center p-8 bg-white rounded-xl shadow-sm border border-slate-200 my-8 gap-8">
      <div className="flex-1 w-full">
        <div className="flex justify-between items-start mb-6">
            <div>
                <h3 className="font-serif text-2xl text-slate-900 mb-2">Sagittal Alignment Changes</h3>
                <p className="text-slate-500 text-sm max-w-xs">
                    Comparison of vertebral angles (degrees) between neutral position and texting.
                </p>
            </div>
            <div className="flex bg-slate-100 rounded-lg p-1">
                <button 
                    onClick={() => setPosture('standing')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${posture === 'standing' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Standing
                </button>
                <button 
                    onClick={() => setPosture('sitting')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${posture === 'sitting' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Sitting
                </button>
            </div>
        </div>

        <div className="space-y-8">
            {segments.map((seg) => {
                const neutral = currentData[seg].neutral;
                const texting = currentData[seg].texting;
                const max = 35; // Scale max
                
                return (
                    <div key={seg} className="relative">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                            <span>{seg} <span className="font-normal normal-case text-slate-300 ml-2">({SEGMENT_DESCRIPTIONS[seg]})</span></span>
                        </div>
                        
                        <div className="h-16 relative bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                             {/* Neutral Bar */}
                             <div className="absolute top-2 left-0 h-5 bg-slate-300 rounded-r-md transition-all duration-500 flex items-center justify-end pr-2 text-xs font-mono font-bold text-slate-600" style={{ width: `${(neutral/max)*100}%` }}>
                                {neutral.toFixed(1)}°
                             </div>
                             
                             {/* Texting Bar */}
                             <div className="absolute top-8 left-0 h-5 bg-blue-500 rounded-r-md transition-all duration-500 flex items-center justify-end pr-2 text-xs font-mono font-bold text-white shadow-lg shadow-blue-500/20" style={{ width: `${(texting/max)*100}%` }}>
                                {texting.toFixed(1)}°
                             </div>

                             <div className="absolute right-4 top-0 bottom-0 flex items-center text-xs font-medium text-red-500">
                                {seg !== 'AOL' && (texting < neutral) && (
                                    <span>-{Math.abs(neutral - texting).toFixed(1)}°</span>
                                )}
                             </div>
                        </div>
                    </div>
                )
            })}
        </div>
        
        <div className="mt-6 flex gap-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-300 rounded"></div> Neutral Position
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div> While Texting
            </div>
        </div>
      </div>
    </div>
  );
};

// --- STUDY METHODS DIAGRAM ---
export const StudyMethodsDiagram: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        {[
            { label: 'Sample Size', value: '34', sub: 'Healthy Volunteers', icon: <User size={20} /> },
            { label: 'Age Range', value: '20-39', sub: 'Years Old', icon: <Info size={20} /> },
            { label: 'Task Duration', value: '10-15', sub: 'Minutes Texting', icon: <Smartphone size={20} /> },
            { label: 'States Measured', value: '4', sub: 'Sit/Stand x Neutral/Text', icon: <ChevronDown size={20} /> },
        ].map((item, i) => (
            <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col items-center text-center hover:border-blue-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                    {item.icon}
                </div>
                <div className="text-3xl font-serif font-bold text-slate-800 mb-1">{item.value}</div>
                <div className="text-sm font-bold text-slate-900">{item.label}</div>
                <div className="text-xs text-slate-500">{item.sub}</div>
            </div>
        ))}
    </div>
  );
};