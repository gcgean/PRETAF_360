import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  Target,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Dumbbell,
  Trophy,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingData {
  name: string;
  targetExam: string;
  examDate: string;
  level: 'beginner' | 'intermediate' | 'advanced' | '';
  difficulties: string[];
  goal: string;
}

const difficulties = [
  { id: 'barra', label: 'Barra fixa', icon: '💪' },
  { id: 'flexao', label: 'Flexão de braço', icon: '🏋️' },
  { id: 'corrida', label: 'Corrida', icon: '🏃' },
  { id: 'natacao', label: 'Natação', icon: '🏊' },
  { id: 'abdominal', label: 'Abdominal', icon: '🔥' },
  { id: 'outro', label: 'Outro', icon: '❓' },
];

const levels = [
  {
    id: 'beginner',
    label: 'Iniciante',
    description: 'Estou começando do zero ou voltando após muito tempo',
    icon: '🌱',
  },
  {
    id: 'intermediate',
    label: 'Intermediário',
    description: 'Já treino regularmente mas preciso melhorar',
    icon: '🌿',
  },
  {
    id: 'advanced',
    label: 'Avançado',
    description: 'Treino consistentemente e quero otimizar',
    icon: '🌳',
  },
];

const goals = [
  { id: 'passar_taf', label: 'Passar no TAF', icon: '🎯' },
  { id: 'condicionamento', label: 'Melhorar condicionamento', icon: '💪' },
  { id: 'manter_forma', label: 'Manter a forma', icon: '✨' },
  { id: 'performance', label: 'Alta performance', icon: '🏆' },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    name: '',
    targetExam: '',
    examDate: '',
    level: '',
    difficulties: [],
    goal: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update user and clear onboarding flag
    if (user) {
      updateUser({ name: data.name || user.name });
    }
    localStorage.removeItem('pretaf_needs_onboarding');

    setIsLoading(false);
    navigate('/dashboard');
  };

  const toggleDifficulty = (id: string) => {
    setData((prev) => ({
      ...prev,
      difficulties: prev.difficulties.includes(id)
        ? prev.difficulties.filter((d) => d !== id)
        : [...prev.difficulties, id],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return data.name.trim().length > 0 && data.targetExam.trim().length > 0;
      case 2:
        return data.level !== '';
      case 3:
        return data.difficulties.length > 0;
      case 4:
        return data.goal !== '';
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Target className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">PRE TAF 360</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Passo {step} de {totalSteps}
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-4">
        <ProgressBar value={progress} size="sm" variant="primary" />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg animate-fade-in">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="card-elevated p-6 md:p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Vamos conhecer você
                </h1>
                <p className="text-muted-foreground">
                  Precisamos de algumas informações para personalizar seu plano
                </p>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Como podemos te chamar?</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetExam">Qual concurso/TAF você está mirando?</Label>
                  <Input
                    id="targetExam"
                    type="text"
                    placeholder="Ex: Polícia Federal, PRF, Bombeiros..."
                    value={data.targetExam}
                    onChange={(e) => setData({ ...data, targetExam: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="examDate">Data da prova (opcional)</Label>
                  <Input
                    id="examDate"
                    type="date"
                    value={data.examDate}
                    onChange={(e) => setData({ ...data, examDate: e.target.value })}
                    className="h-12"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Level */}
          {step === 2 && (
            <div className="card-elevated p-6 md:p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Dumbbell className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Qual seu nível atual?
                </h1>
                <p className="text-muted-foreground">
                  Isso nos ajuda a calibrar seu plano de treino
                </p>
              </div>

              <div className="space-y-3">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setData({ ...data, level: level.id as typeof data.level })}
                    className={cn(
                      'w-full p-4 rounded-xl border-2 text-left transition-all',
                      data.level === level.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30 bg-card'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{level.icon}</span>
                      <div>
                        <p className="font-semibold text-foreground">{level.label}</p>
                        <p className="text-sm text-muted-foreground">{level.description}</p>
                      </div>
                      {data.level === level.id && (
                        <CheckCircle className="w-5 h-5 text-primary ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Difficulties */}
          {step === 3 && (
            <div className="card-elevated p-6 md:p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Onde você sente mais dificuldade?
                </h1>
                <p className="text-muted-foreground">
                  Selecione uma ou mais opções
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {difficulties.map((diff) => (
                  <button
                    key={diff.id}
                    onClick={() => toggleDifficulty(diff.id)}
                    className={cn(
                      'p-4 rounded-xl border-2 text-center transition-all',
                      data.difficulties.includes(diff.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30 bg-card'
                    )}
                  >
                    <span className="text-3xl block mb-2">{diff.icon}</span>
                    <span className="text-sm font-medium text-foreground">{diff.label}</span>
                    {data.difficulties.includes(diff.id) && (
                      <CheckCircle className="w-4 h-4 text-primary mx-auto mt-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Goal */}
          {step === 4 && (
            <div className="card-elevated p-6 md:p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-success" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Qual seu principal objetivo?
                </h1>
                <p className="text-muted-foreground">
                  Vamos focar no que mais importa para você
                </p>
              </div>

              <div className="space-y-3">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => setData({ ...data, goal: goal.id })}
                    className={cn(
                      'w-full p-4 rounded-xl border-2 text-left transition-all',
                      data.goal === goal.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30 bg-card'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{goal.icon}</span>
                      <span className="font-semibold text-foreground">{goal.label}</span>
                      {data.goal === goal.id && (
                        <CheckCircle className="w-5 h-5 text-primary ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <Button variant="outline" size="lg" onClick={handleBack} className="flex-1">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar
              </Button>
            )}
            {step < totalSteps ? (
              <Button
                variant="gradient"
                size="lg"
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1"
              >
                Continuar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button
                variant="gradient"
                size="lg"
                onClick={handleComplete}
                disabled={!canProceed() || isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    Começar treinos
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
