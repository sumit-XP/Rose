
import React, { useState, useEffect } from 'react';
import Petals from './components/Petals';
import ProposalModal from './components/ProposalModal';
import { generateRomanticPoem } from './services/geminiService';
import { PoemResponse, RoseReason, MessageMood } from './types';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

const App: React.FC = () => {
  // Hardcoded for Anuska as requested
  const partnerName = "Anuska";
  const userName = "Your Valentine";
  
  // Starting directly at 'garden' step
  const [step, setStep] = useState<'garden' | 'poem' | 'proposal' | 'success'>('garden');
  const [mood] = useState<MessageMood>('Sincere');
  const [poem, setPoem] = useState<PoemResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedRoses, setClickedRoses] = useState<number[]>([]);
  const [sparklePos, setSparklePos] = useState<{ x: number, y: number } | null>(null);

  const roseReasons: RoseReason[] = [
    { id: 1, text: "Your beautiful soul", color: "rose-600" },
    { id: 2, text: "The magic in your eyes", color: "pink-500" },
    { id: 3, text: "How you make me feel safe", color: "rose-500" },
    { id: 4, text: "Your incredible mind", color: "red-400" },
    { id: 5, text: "The way you say my name", color: "pink-600" },
    { id: 6, text: "Your unwavering kindness", color: "rose-700" },
  ];

  const handleRoseClick = (id: number, e: React.MouseEvent) => {
    if (!clickedRoses.includes(id)) {
      setClickedRoses(prev => [...prev, id]);
      setSparklePos({ x: e.clientX, y: e.clientY });
      setTimeout(() => setSparklePos(null), 1000);
    }
    if (clickedRoses.length + 1 === roseReasons.length) {
      setTimeout(() => setStep('poem'), 2000);
    }
  };

  const fetchPoem = async () => {
    setIsLoading(true);
    const result = await generateRomanticPoem(userName, partnerName, mood);
    setPoem(result);
    setIsLoading(false);
  };

  useEffect(() => {
    if (step === 'poem') {
      fetchPoem();
    }
  }, [step]);

  const handleAccept = () => {
    confetti({
      particleCount: 250,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#fb7185', '#ffffff', '#f43f5e']
    });
    setStep('success');
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden">
      <Petals />
      
      {/* Sparkle Effect */}
      {sparklePos && (
        <div 
          className="fixed pointer-events-none z-50 animate-ping text-rose-400"
          style={{ top: sparklePos.y - 20, left: sparklePos.x - 20 }}
        >
          <i className="fas fa-sparkles text-4xl"></i>
        </div>
      )}

      {/* Virtual Rose Garden - Start Here */}
      {step === 'garden' && (
        <div className="z-20 max-w-4xl w-full text-center animate-fadeIn px-4">
          <h2 className="text-4xl md:text-5xl font-dancing text-rose-700 mb-4">For you, Anuska...</h2>
          <p className="text-rose-500 mb-12 font-playfair italic text-lg">Pick each rose to see why my heart beats for you.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {roseReasons.map((rose) => (
              <div 
                key={rose.id} 
                onClick={(e) => handleRoseClick(rose.id, e)}
                className={`group relative cursor-pointer transition-all duration-700 transform ${clickedRoses.includes(rose.id) ? 'scale-105' : 'hover:scale-110'}`}
              >
                <div className={`relative w-28 h-28 mx-auto flex items-center justify-center rounded-full transition-all duration-1000 ${clickedRoses.includes(rose.id) ? 'bg-rose-100 shadow-rose-200' : 'bg-rose-50 shadow-sm'} shadow-xl mb-4 overflow-hidden`}>
                  <i className={`fas fa-rose text-5xl transition-all duration-700 ${clickedRoses.includes(rose.id) ? 'text-rose-600 scale-125' : 'text-rose-200 group-hover:text-rose-300'}`}></i>
                  {clickedRoses.includes(rose.id) && (
                    <div className="absolute inset-0 bg-rose-400/10 animate-pulse"></div>
                  )}
                </div>
                <div className={`transition-all duration-700 ${clickedRoses.includes(rose.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <p className="text-rose-800 font-medium font-playfair text-xl tracking-tight">{rose.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 flex items-center justify-center gap-2">
            <div className="h-1 w-32 bg-rose-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-rose-500 transition-all duration-500" 
                style={{ width: `${(clickedRoses.length / roseReasons.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-rose-400 text-sm font-bold uppercase tracking-widest">{clickedRoses.length} / {roseReasons.length}</span>
          </div>
        </div>
      )}

      {/* AI Letter Section */}
      {step === 'poem' && (
        <div className="z-20 max-w-2xl w-full text-center animate-fadeIn p-4">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center bg-white/60 backdrop-blur rounded-[3rem]">
              <div className="relative w-20 h-20 mb-6">
                 <div className="absolute inset-0 border-4 border-rose-100 rounded-full"></div>
                 <div className="absolute inset-0 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                 <i className="fas fa-feather absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-500 text-2xl"></i>
              </div>
              <p className="text-rose-600 font-dancing text-3xl italic">Writing something from the heart...</p>
            </div>
          ) : (
            <div className="relative bg-[#fdfcf0] p-8 md:p-14 rounded-sm shadow-2xl border-l-[1.5rem] border-rose-800/20 transform -rotate-1 hover:rotate-0 transition-transform duration-500 overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="text-left">
                    <p className="font-dancing text-rose-800 text-xl">{new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    <p className="font-playfair font-bold text-rose-900 text-3xl mt-2">Dear Anuska,</p>
                  </div>
                  <div className="w-16 h-16 bg-rose-800 rounded-full flex items-center justify-center shadow-lg border-4 border-rose-900/10 rotate-12">
                     <i className="fas fa-heart text-rose-100 text-2xl"></i>
                  </div>
                </div>

                <div className="h-0.5 w-full bg-rose-900/5 mb-10"></div>

                <div className="text-gray-800 text-2xl font-dancing leading-relaxed mb-12 italic text-left space-y-4">
                  {poem?.poem.split('\n').map((line, idx) => (
                    <p key={idx} className="animate-fadeIn" style={{ animationDelay: `${idx * 0.5}s` }}>
                      {line}
                    </p>
                  ))}
                </div>

                <div className="text-right mt-12 pt-8 border-t border-rose-900/5">
                  <p className="font-dancing text-rose-800 text-2xl italic">Always yours,</p>
                  <p className="font-playfair font-bold text-rose-900 text-3xl mt-1">{userName}</p>
                </div>
              </div>

              <button 
                onClick={() => setStep('proposal')}
                className="mt-12 bg-rose-700 hover:bg-rose-800 text-white font-bold py-4 px-14 rounded-full transition-all shadow-2xl transform hover:scale-105 active:scale-95 group"
              >
                Open My Heart <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Proposal Modal Overlay */}
      {step === 'proposal' && <ProposalModal partnerName={partnerName} onAccept={handleAccept} />}

      {/* Success View */}
      {step === 'success' && (
        <div className="z-20 text-center animate-fadeIn max-w-xl px-4">
          <div className="mb-10 relative inline-block">
            <i className="fas fa-heart text-[10rem] text-rose-500 animate-pulse drop-shadow-2xl"></i>
            <div className="absolute inset-0 flex items-center justify-center">
               <i className="fas fa-check text-rose-100 text-4xl"></i>
            </div>
          </div>
          <h1 className="text-7xl font-dancing text-rose-600 mb-4">A Thousand Times, Yes!</h1>
          <p className="text-2xl font-playfair text-rose-800 mb-10 leading-relaxed italic">
            "Anuska, you have made me the happiest person alive. Here's to us, our love, and our beautiful forever."
          </p>
          <div className="p-8 bg-white/90 rounded-3xl shadow-xl border border-rose-50 italic text-rose-700 font-dancing text-3xl">
             "Love is the only rose that never withers."
          </div>
        </div>
      )}

      {/* Background Decor Elements */}
      <div className="fixed -bottom-20 -left-20 w-80 h-80 bg-rose-200/20 blur-[100px] rounded-full z-0"></div>
      <div className="fixed -top-20 -right-20 w-80 h-80 bg-pink-200/20 blur-[100px] rounded-full z-0"></div>
    </div>
  );
};

export default App;
