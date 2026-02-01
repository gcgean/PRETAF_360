import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EmptyState } from '@/components/ui/EmptyState';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  Trophy,
  Play,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  Timer,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data
const mockSimuladoHistory = [
  {
    id: '1',
    date: '2024-01-10',
    barraReps: 7,
    flexaoReps: 32,
    corridaTime: 720, // 12 minutes
    corridaDistance: 2200,
    passed: false,
    score: 72,
  },
  {
    id: '2',
    date: '2024-01-03',
    barraReps: 6,
    flexaoReps: 28,
    corridaTime: 720,
    corridaDistance: 2050,
    passed: false,
    score: 65,
  },
];

const requirements = {
  barra: { min: 10, label: 'Barra fixa' },
  flexao: { min: 40, label: 'Flexão' },
  corrida: { min: 2400, label: 'Corrida 12min (metros)' },
};

type SimuladoStep = 'start' | 'barra' | 'flexao' | 'corrida' | 'result';

export default function SimuladosPage() {
  const [step, setStep] = useState<SimuladoStep>('start');
  const [results, setResults] = useState({
    barra: '',
    flexao: '',
    corrida: '',
  });

  const handleStartSimulado = () => {
    setStep('barra');
    setResults({ barra: '', flexao: '', corrida: '' });
  };

  const handleNext = () => {
    if (step === 'barra') setStep('flexao');
    else if (step === 'flexao') setStep('corrida');
    else if (step === 'corrida') setStep('result');
  };

  const calculateScore = () => {
    const barraScore = Math.min((parseInt(results.barra) / requirements.barra.min) * 100, 100);
    const flexaoScore = Math.min((parseInt(results.flexao) / requirements.flexao.min) * 100, 100);
    const corridaScore = Math.min(
      (parseInt(results.corrida) / requirements.corrida.min) * 100,
      100
    );
    return Math.round((barraScore + flexaoScore + corridaScore) / 3);
  };

  const isPassed = () => {
    return (
      parseInt(results.barra) >= requirements.barra.min &&
      parseInt(results.flexao) >= requirements.flexao.min &&
      parseInt(results.corrida) >= requirements.corrida.min
    );
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Start screen
  if (step === 'start') {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Simulados</h1>
          <p className="text-muted-foreground">Teste seu desempenho atual</p>
        </div>

        {/* Start Card */}
        <div className="card-elevated p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Iniciar simulado</h2>
          <p className="text-muted-foreground mb-6">
            Registre seus resultados em cada exercício e veja se você passaria no TAF
          </p>
          <Button variant="gradient" size="lg" onClick={handleStartSimulado}>
            <Play className="w-5 h-5 mr-2" />
            Começar agora
          </Button>
        </div>

        {/* Requirements */}
        <div className="card-elevated p-5">
          <h3 className="font-semibold text-foreground mb-4">Requisitos mínimos</h3>
          <div className="space-y-3">
            {Object.entries(requirements).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-muted-foreground">{value.label}</span>
                <span className="font-semibold text-foreground">{value.min}</span>
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div className="card-elevated p-5">
          <h3 className="font-semibold text-foreground mb-4">Histórico</h3>
          {mockSimuladoHistory.length > 0 ? (
            <div className="space-y-3">
              {mockSimuladoHistory.map((sim) => (
                <div
                  key={sim.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        sim.passed ? 'bg-success/10' : 'bg-destructive/10'
                      )}
                    >
                      {sim.passed ? (
                        <CheckCircle className="w-5 h-5 text-success" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{formatDate(sim.date)}</p>
                      <p className="text-sm text-muted-foreground">Pontuação: {sim.score}%</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Trophy}
              title="Nenhum simulado"
              description="Faça seu primeiro simulado para acompanhar sua evolução"
            />
          )}
        </div>
      </div>
    );
  }

  // Input screens
  if (step === 'barra' || step === 'flexao' || step === 'corrida') {
    const currentExercise = step;
    const config = {
      barra: {
        title: 'Barra fixa',
        description: 'Quantas repetições você conseguiu?',
        placeholder: 'Ex: 8',
        icon: '💪',
      },
      flexao: {
        title: 'Flexão de braço',
        description: 'Quantas repetições você conseguiu?',
        placeholder: 'Ex: 35',
        icon: '🏋️',
      },
      corrida: {
        title: 'Corrida 12 minutos',
        description: 'Quantos metros você percorreu?',
        placeholder: 'Ex: 2400',
        icon: '🏃',
      },
    };

    const stepNumber = step === 'barra' ? 1 : step === 'flexao' ? 2 : 3;

    return (
      <div className="max-w-md mx-auto space-y-6 animate-fade-in">
        <ProgressBar value={(stepNumber / 3) * 100} variant="primary" size="sm" />

        <div className="card-elevated p-6 text-center">
          <span className="text-4xl mb-4 block">{config[currentExercise].icon}</span>
          <p className="text-sm text-muted-foreground mb-2">Etapa {stepNumber} de 3</p>
          <h2 className="text-xl font-bold text-foreground mb-2">
            {config[currentExercise].title}
          </h2>
          <p className="text-muted-foreground mb-6">{config[currentExercise].description}</p>

          <Input
            type="number"
            placeholder={config[currentExercise].placeholder}
            value={results[currentExercise]}
            onChange={(e) => setResults({ ...results, [currentExercise]: e.target.value })}
            className="h-14 text-center text-2xl font-bold"
          />

          <p className="text-sm text-muted-foreground mt-2">
            Mínimo: {requirements[currentExercise].min}
          </p>

          <Button
            variant="gradient"
            size="lg"
            className="w-full mt-6"
            onClick={handleNext}
            disabled={!results[currentExercise]}
          >
            {step === 'corrida' ? 'Ver resultado' : 'Próximo'}
          </Button>
        </div>
      </div>
    );
  }

  // Result screen
  if (step === 'result') {
    const score = calculateScore();
    const passed = isPassed();

    return (
      <div className="max-w-md mx-auto space-y-6 animate-scale-in">
        <div className="card-elevated p-6 text-center">
          <div
            className={cn(
              'w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4',
              passed ? 'bg-success/10' : 'bg-destructive/10'
            )}
          >
            {passed ? (
              <CheckCircle className="w-10 h-10 text-success" />
            ) : (
              <XCircle className="w-10 h-10 text-destructive" />
            )}
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">
            {passed ? 'Parabéns! Você passou!' : 'Continue treinando!'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {passed
              ? 'Você atingiu todos os requisitos mínimos'
              : 'Você ainda não atingiu todos os requisitos'}
          </p>

          <div className="text-5xl font-bold text-foreground mb-6">{score}%</div>

          {/* Results breakdown */}
          <div className="space-y-4 text-left">
            {Object.entries(requirements).map(([key, req]) => {
              const value = parseInt(results[key as keyof typeof results]);
              const passed = value >= req.min;
              const percentage = Math.min((value / req.min) * 100, 100);

              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{req.label}</span>
                    <span
                      className={cn('text-sm font-medium', passed ? 'text-success' : 'text-destructive')}
                    >
                      {value} / {req.min}
                    </span>
                  </div>
                  <ProgressBar value={percentage} variant={passed ? 'success' : 'accent'} size="sm" />
                </div>
              );
            })}
          </div>

          <Button variant="gradient" size="lg" className="w-full mt-6" onClick={() => setStep('start')}>
            Voltar ao início
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
