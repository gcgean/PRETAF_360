import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import {
  Dumbbell,
  Calendar,
  Flame,
  TrendingUp,
  Video,
  MessageSquare,
  ChevronRight,
  Play,
  Trophy,
  Target,
} from 'lucide-react';

// Mock data
const mockTrainingToday = {
  id: '1',
  title: 'Treino de Força - Superiores',
  exercises: [
    { name: 'Flexão de braço', sets: 4, reps: 15 },
    { name: 'Barra fixa', sets: 4, reps: 8 },
    { name: 'Prancha', duration: 60 },
  ],
  estimatedTime: 45,
};

const mockProgress = {
  streak: 7,
  weeklyConsistency: 85,
  monthlyProgress: 12,
  totalWorkouts: 24,
};

const mockFeedback = {
  coachName: 'Carlos Treinador',
  exerciseType: 'Barra fixa',
  date: '2024-01-15',
  preview: 'Ótima evolução! A pegada está correta, mas precisamos trabalhar...',
};

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Olá, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Vamos manter o foco hoje
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Flame className="w-5 h-5 text-accent" />
          <span className="font-bold text-foreground">{mockProgress.streak}</span>
          <span className="text-muted-foreground">dias</span>
        </div>
      </div>

      {/* Main Training Card */}
      <div className="card-elevated p-6 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="w-4 h-4" />
          <span>Treino de hoje</span>
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">
          {mockTrainingToday.title}
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {mockTrainingToday.exercises.map((ex, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-secondary text-sm text-foreground"
            >
              {ex.name}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            ~{mockTrainingToday.estimatedTime} min
          </span>
          <Link to="/dashboard/treinos">
            <Button variant="gradient" size="lg">
              <Play className="w-5 h-5 mr-2" />
              Iniciar treino
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card-elevated p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Flame className="w-4 h-4 text-accent" />
            <span className="text-sm">Streak</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{mockProgress.streak} dias</p>
        </div>
        <div className="card-elevated p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm">Constância</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{mockProgress.weeklyConsistency}%</p>
        </div>
        <div className="card-elevated p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-sm">Evolução</span>
          </div>
          <p className="text-2xl font-bold text-foreground">+{mockProgress.monthlyProgress}%</p>
        </div>
        <div className="card-elevated p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Dumbbell className="w-4 h-4 text-info" />
            <span className="text-sm">Treinos</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{mockProgress.totalWorkouts}</p>
        </div>
      </div>

      {/* Progress This Week */}
      <div className="card-elevated p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Progresso semanal</h3>
          <Link to="/dashboard/evolucao" className="text-sm text-primary hover:underline">
            Ver mais
          </Link>
        </div>
        <ProgressBar
          value={mockProgress.weeklyConsistency}
          showLabel
          size="lg"
          variant="primary"
        />
        <div className="flex justify-between mt-4">
          {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  i < 5
                    ? 'bg-success text-success-foreground'
                    : i === 5
                    ? 'bg-secondary text-muted-foreground'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                {i < 5 ? '✓' : ''}
              </div>
              <span className="text-xs text-muted-foreground">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Video Upload */}
        <Link to="/dashboard/enviar-video" className="card-interactive p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Video className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Enviar vídeo</h3>
              <p className="text-sm text-muted-foreground">
                Receba correção técnica do treinador
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </Link>

        {/* Simulados */}
        <Link to="/dashboard/simulados" className="card-interactive p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-success" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Simulados</h3>
              <p className="text-sm text-muted-foreground">
                Teste seu desempenho atual
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </Link>
      </div>

      {/* Latest Feedback */}
      <div className="card-elevated p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Último feedback</h3>
          <Link to="/dashboard/feedback" className="text-sm text-primary hover:underline">
            Ver todos
          </Link>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-foreground">{mockFeedback.coachName}</span>
              <StatusBadge status="corrected" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">
              {mockFeedback.exerciseType} • {mockFeedback.date}
            </p>
            <p className="text-sm text-foreground line-clamp-2">{mockFeedback.preview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
