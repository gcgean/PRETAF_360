import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  Play,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Dumbbell,
  Timer,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data
const mockExercises = [
  {
    id: '1',
    name: 'Aquecimento',
    type: 'outro',
    duration: 300,
    completed: true,
    description: 'Polichinelos, rotação de ombros, alongamentos dinâmicos',
  },
  {
    id: '2',
    name: 'Flexão de braço',
    type: 'flexao',
    sets: 4,
    reps: 15,
    restTime: 60,
    completed: false,
    description: 'Mãos na largura dos ombros, descer até o peito quase tocar o chão',
    videoUrl: 'https://example.com/video',
  },
  {
    id: '3',
    name: 'Barra fixa',
    type: 'barra',
    sets: 4,
    reps: 8,
    restTime: 90,
    completed: false,
    description: 'Pegada pronada, subir até o queixo passar a barra',
    videoUrl: 'https://example.com/video',
  },
  {
    id: '4',
    name: 'Prancha abdominal',
    type: 'outro',
    sets: 3,
    duration: 45,
    restTime: 30,
    completed: false,
    description: 'Manter corpo alinhado, contrair abdômen',
  },
  {
    id: '5',
    name: 'Corrida leve',
    type: 'corrida',
    distance: 2000,
    completed: false,
    description: 'Ritmo confortável para finalizar o treino',
  },
];

export default function TrainingDayPage() {
  const [exercises, setExercises] = useState(mockExercises);
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const [rpe, setRpe] = useState<number | null>(null);
  const [notes, setNotes] = useState('');

  const completedCount = exercises.filter((e) => e.completed).length;
  const progress = (completedCount / exercises.length) * 100;
  const allCompleted = completedCount === exercises.length;

  const toggleExercise = (id: string) => {
    setExercises((prev) =>
      prev.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e))
    );
  };

  const toggleExpanded = (id: string) => {
    setExpandedExercise(expandedExercise === id ? null : id);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}min ${secs > 0 ? `${secs}s` : ''}` : `${secs}s`;
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <p className="text-sm text-muted-foreground mb-1">Segunda-feira, 15 Jan</p>
        <h1 className="text-2xl font-bold text-foreground">Treino de Força - Superiores</h1>
      </div>

      {/* Progress */}
      <div className="card-elevated p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">Progresso do treino</span>
          <span className="text-sm font-medium text-foreground">
            {completedCount}/{exercises.length}
          </span>
        </div>
        <ProgressBar
          value={progress}
          variant={allCompleted ? 'success' : 'primary'}
          size="lg"
        />
      </div>

      {/* Exercises List */}
      <div className="space-y-3">
        {exercises.map((exercise, index) => (
          <div
            key={exercise.id}
            className={cn(
              'card-elevated overflow-hidden transition-all',
              exercise.completed && 'opacity-75'
            )}
          >
            <div
              className="p-4 flex items-center gap-4 cursor-pointer"
              onClick={() => toggleExpanded(exercise.id)}
            >
              {/* Completion checkbox */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExercise(exercise.id);
                }}
                className={cn(
                  'w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0',
                  exercise.completed
                    ? 'bg-success border-success text-success-foreground'
                    : 'border-border hover:border-primary'
                )}
              >
                {exercise.completed && <CheckCircle className="w-5 h-5" />}
              </button>

              {/* Exercise info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">#{index + 1}</span>
                  <h3
                    className={cn(
                      'font-semibold text-foreground',
                      exercise.completed && 'line-through'
                    )}
                  >
                    {exercise.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                  {exercise.sets && exercise.reps && (
                    <span className="flex items-center gap-1">
                      <Dumbbell className="w-3 h-3" />
                      {exercise.sets}x{exercise.reps}
                    </span>
                  )}
                  {exercise.duration && (
                    <span className="flex items-center gap-1">
                      <Timer className="w-3 h-3" />
                      {formatDuration(exercise.duration)}
                    </span>
                  )}
                  {exercise.distance && (
                    <span className="flex items-center gap-1">
                      <Timer className="w-3 h-3" />
                      {exercise.distance / 1000}km
                    </span>
                  )}
                  {exercise.restTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {exercise.restTime}s descanso
                    </span>
                  )}
                </div>
              </div>

              {/* Expand icon */}
              {expandedExercise === exercise.id ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </div>

            {/* Expanded content */}
            {expandedExercise === exercise.id && (
              <div className="px-4 pb-4 pt-0 border-t border-border mt-2">
                <div className="pt-4 space-y-3">
                  <p className="text-sm text-muted-foreground">{exercise.description}</p>
                  {exercise.videoUrl && (
                    <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Play className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                        <span className="text-sm text-muted-foreground">
                          Vídeo demonstrativo
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* RPE and Notes */}
      {allCompleted && (
        <div className="card-elevated p-5 space-y-4 animate-scale-in">
          <h3 className="font-semibold text-foreground">Como foi o treino?</h3>

          {/* RPE Scale */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Esforço percebido (RPE 1-10)
            </label>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <button
                  key={value}
                  onClick={() => setRpe(value)}
                  className={cn(
                    'w-10 h-10 rounded-lg border-2 font-medium transition-colors',
                    rpe === value
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Observações (opcional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Como você se sentiu? Alguma dificuldade?"
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none h-24 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <Button variant="gradient" size="lg" className="w-full">
            <CheckCircle className="w-5 h-5 mr-2" />
            Concluir treino
          </Button>
        </div>
      )}

      {!allCompleted && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">
            Complete todos os exercícios para finalizar o treino
          </p>
        </div>
      )}
    </div>
  );
}
