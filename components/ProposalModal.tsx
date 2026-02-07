
import React, { useState, useRef } from 'react';

interface ProposalModalProps {
  onAccept: () => void;
  partnerName: string;
}

const ProposalModal: React.FC<ProposalModalProps> = ({ onAccept, partnerName }) => {
  const [noPos, setNoPos] = useState({ top: 'auto', left: 'auto' });
  const [noTextIndex, setNoTextIndex] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const noTexts = [
    "No",
    "Are you sure?",
    "Think again?",
    "Really? 💔",
    "Wait, look at the roses!",
    "I'll be very sad...",
    "Please say yes?",
    "Okay, last chance to reconsider...",
    "You're just kidding, right?",
    "Click the big red button instead!",
    "Wrong button! Try again."
  ];

  const moveNoButton = () => {
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 100);
    setNoPos({ top: `${y}px`, left: `${x}px` });
    
    // Increment text and scale the Yes button
    setNoTextIndex((prev) => (prev + 1) % noTexts.length);
    setYesScale((prev) => prev + 0.15);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 max-w-md w-full text-center relative overflow-hidden border-4 border-rose-100">
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400"></div>
        
        <div className="mb-6">
           <i className="fas fa-crown text-rose-300 text-2xl mb-2"></i>
           <h2 className="text-5xl font-dancing text-rose-600">Dear {partnerName}...</h2>
        </div>
        
        <p className="text-gray-700 text-xl mb-10 font-playfair leading-relaxed italic">
          Every rose in my garden exists because of you. You are my light, my heart, and my every dream come true.
        </p>

        <h3 className="text-3xl font-bold text-rose-500 mb-12 animate-pulse tracking-tight">
          Will you be my Valentine? 💖
        </h3>

        <div className="flex flex-col items-center justify-center gap-6">
          <button
            onClick={onAccept}
            style={{ transform: `scale(${yesScale})` }}
            className="bg-gradient-to-br from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white font-bold py-5 px-14 rounded-full transition-all shadow-xl hover:shadow-rose-500/50 z-20 whitespace-nowrap"
          >
            YES! ❤️
          </button>
          
          <button
            ref={noBtnRef}
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            style={{ 
              position: noPos.top === 'auto' ? 'static' : 'fixed',
              top: noPos.top,
              left: noPos.left,
              transition: 'all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              opacity: 0.8
            }}
            className="bg-gray-100 text-gray-500 py-3 px-10 rounded-full cursor-pointer border border-gray-200 hover:bg-gray-200 transition-colors z-10"
          >
            {noTexts[noTextIndex]}
          </button>
        </div>
        
        <div className="mt-12 text-rose-200">
          <i className="fas fa-heart text-5xl opacity-50"></i>
        </div>
      </div>
    </div>
  );
};

export default ProposalModal;
