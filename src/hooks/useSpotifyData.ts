import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { SpotifyTrack } from '../types/spotify';
import { processSpotifyData } from '../utils/dataProcessor';

export const useSpotifyData = () => {
  const [data, setData] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/spotify-2023.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const processedData = processSpotifyData(results.data as SpotifyTrack[]);
            setData(processedData);
            setLoading(false);
          },
          error: (error) => {
            setError(error.message);
            setLoading(false);
          }
        });
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};