export interface CarbonRecord {
  id?: number;
  user_id?: number;
  total_monthly: number;
  estimated_annual: number;
  carbon_score: number;
  impact_level: string;
  category_breakdown?: Record<string, number>;
  record_month?: number;
  record_year?: number;
  calculated_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Gamification {
  level: number;
  streak_days: number;
  achievements: string[];
}

export interface Analytics {
  monthly_avg: number;
  trend: string;
  improvement_percentage?: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: string;
  category: string;
}

export interface UserProgress {
  total_savings_kg: number;
  completed_actions: number;
}

export interface DashboardData {
  username?: string;
  history: CarbonRecord[];
  analytics: Analytics;
  ai_coach: string;
  gamification: Gamification;
  latest_record: CarbonRecord | null;
  recommendations: Recommendation[];
  progress?: UserProgress;
}

export interface CarbonCalculationRequest {
  transport_mode: string;
  transport_distance: number;
  transport_days: number;
  electricity_units: number;
  food_diet: string;
  shopping_tier: string;
  waste_tier: string;
  flights_per_year?: number;
}

export interface CarbonCalculationResponse {
  total_monthly: number;
  estimated_annual: number;
  carbon_score: number;
  impact_level: string;
  breakdown: Record<string, number>;
  ai_coaching: string;
}

export interface APIResponse<T> {
  data: T;
  status?: string;
  error?: string;
  message?: string;
}
