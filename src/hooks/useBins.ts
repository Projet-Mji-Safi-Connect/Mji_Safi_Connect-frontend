import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export const useBins = () => {
  const fetchBins = useAppStore((state) => state.fetchBins);

  useEffect(() => {
    fetchBins();
    
    // Optionnel: Polling toutes les 30 secondes
    const interval = setInterval(fetchBins, 30000);
    return () => clearInterval(interval);
  }, [fetchBins]);
};
