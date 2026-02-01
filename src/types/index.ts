// User roles
export type UserRole = 'USER' | 'COACH' | 'ADMIN';

// Subscription plans
export type SubscriptionPlan = 'FREE' | 'PRO' | 'PREMIUM' | 'ELITE';

// User profile
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  subscription: SubscriptionPlan;
  createdAt: string;
}

// Onboarding data
export interface OnboardingData {
  name: string;
  targetExam: string;
  examDate?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  difficulties: string[];
  goal: string;
}

// Training session
export interface TrainingSession {
  id: string;
  date: string;
  title: string;
  description?: string;
  exercises: Exercise[];
  status: 'pending' | 'completed' | 'missed';
  notes?: string;
  rpe?: number; // Rate of Perceived Exertion (1-10)
  completedAt?: string;
}

// Exercise
export interface Exercise {
  id: string;
  name: string;
  type: 'barra' | 'flexao' | 'corrida' | 'natacao' | 'outro';
  sets?: number;
  reps?: number;
  duration?: number; // in seconds
  distance?: number; // in meters
  restTime?: number; // in seconds
  videoUrl?: string;
  completed: boolean;
}

// Video submission for correction
export interface VideoSubmission {
  id: string;
  userId: string;
  exerciseType: 'barra' | 'flexao' | 'corrida' | 'natacao';
  videoUrl: string;
  description?: string;
  status: 'pending' | 'analyzing' | 'corrected';
  submittedAt: string;
  feedback?: CoachFeedback;
}

// Coach feedback
export interface CoachFeedback {
  id: string;
  coachId: string;
  coachName: string;
  submissionId: string;
  comment: string;
  technicalScore: number; // 0-10
  corrections: string[];
  attachments?: string[];
  createdAt: string;
}

// Simulated test result
export interface SimuladoResult {
  id: string;
  userId: string;
  date: string;
  barraReps?: number;
  flexaoReps?: number;
  corridaTime?: number; // in seconds
  corridaDistance?: number; // in meters
  natacaoTime?: number; // in seconds
  passed: boolean;
  score: number;
}

// Calendar day
export interface CalendarDay {
  date: string;
  hasTraining: boolean;
  status?: 'pending' | 'completed' | 'missed';
  session?: TrainingSession;
}

// Progress data
export interface ProgressData {
  weeklyConsistency: number; // percentage
  monthlyProgress: number; // percentage
  streak: number; // days
  totalWorkouts: number;
  exerciseProgress: {
    type: string;
    current: number;
    target: number;
    unit: string;
  }[];
}

// Plan features for paywall
export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface SubscriptionPlanDetails {
  id: SubscriptionPlan;
  name: string;
  price: number;
  period: 'month' | 'year';
  features: PlanFeature[];
  highlighted?: boolean;
}

// Auth context
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
