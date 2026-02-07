
import React, { useEffect, useState } from 'react';

const Petals: React.FC = () => {
  const [petals, setPetals] = useState<{ id: number; left: string; delay: string; size: string }[]>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      size: `${Math.random() * 20 + 10}px`,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal text-rose-300 opacity-60"
          style={{
            left: p.left,
            animationDelay: p.delay,
            fontSize: p.size,
          }}
        >
          <i className="fas fa-leaf"></i>
        </div>
      ))}
    </div>
  );
};

export default Petals;
