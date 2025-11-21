import React, { useState } from 'react';

interface StartScreenProps {
    onStart: (name: string) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim().length > 0) {
            onStart(name.trim());
        }
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center z-[9999]">
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-[90%] max-w-md text-center relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400"></div>
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-yellow-200 rounded-full opacity-50 blur-xl"></div>
                
                <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">
                    San<span className="text-blue-500">-AI-</span>lika
                </h1>
                <p className="text-gray-500 mb-8 text-sm">Enter the virtual world powered by Gemini.</p>

                <div className="mb-8 flex justify-center">
                    <div className="relative">
                         {/* Preview Avatar */}
                         <div className="w-20 h-20 rounded-full bg-orange-200 border-4 border-white shadow-lg overflow-hidden relative mx-auto">
                             <div className="absolute top-0 w-full h-6 bg-brown-600"></div>
                             <div className="absolute top-8 left-4 flex gap-4">
                                <div className="w-2 h-3 bg-black rounded-full"></div>
                                <div className="w-2 h-3 bg-black rounded-full"></div>
                             </div>
                             <div className="absolute top-14 left-7 w-4 h-1 bg-red-400 rounded-full opacity-60"></div>
                         </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative group">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Choose your nickname"
                            className="w-full bg-gray-50 border-2 border-gray-100 focus:border-blue-400 focus:bg-white rounded-xl px-4 py-3 outline-none transition-all text-center font-bold text-gray-700"
                            maxLength={12}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={name.length === 0}
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Enter World
                    </button>
                </form>
                
                <p className="mt-6 text-xs text-gray-400">
                    Powered by Google Gemini API
                </p>
            </div>
        </div>
    );
};

export default StartScreen;