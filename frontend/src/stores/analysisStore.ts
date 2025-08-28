import { create } from 'zustand';
import { analysis } from '@/services/api';

interface AnalysisResult {
  issues: Array<{
    type: string;
    description: string;
    severity: string;
    line_number?: number;
    suggestion: string;
  }>;
  score: number;
  summary: string;
}

interface AnalysisState {
  isLoading: boolean;
  performanceResult: AnalysisResult | null;
  securityResult: AnalysisResult | null;
  error: string | null;
  analyzePerformance: (code: string, language: string) => Promise<void>;
  analyzeSecurity: (code: string, language: string) => Promise<void>;
  clearResults: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  isLoading: false,
  performanceResult: null,
  securityResult: null,
  error: null,

  analyzePerformance: async (code: string, language: string) => {
    try {
      set({ isLoading: true, error: null });
      const result = await analysis.performance(code, language);
      set({ performanceResult: result, isLoading: false });
    } catch (error) {
      set({
        error: 'Failed to analyze performance',
        isLoading: false,
      });
    }
  },

  analyzeSecurity: async (code: string, language: string) => {
    try {
      set({ isLoading: true, error: null });
      const result = await analysis.security(code, language);
      set({ securityResult: result, isLoading: false });
    } catch (error) {
      set({
        error: 'Failed to analyze security',
        isLoading: false,
      });
    }
  },

  clearResults: () => {
    set({
      performanceResult: null,
      securityResult: null,
      error: null,
    });
  },
}));
