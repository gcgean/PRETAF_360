import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { TrendingUp, Target, Flame, Dumbbell } from 'lucide-react';

// Mock data
const weeklyData = [
  { week: 'Sem 1', consistency: 60, barra: 4, flexao: 12 },
  { week: 'Sem 2', consistency: 75, barra: 5, flexao: 15 },
  { week: 'Sem 3', consistency: 85, barra: 6, flexao: 18 },
  { week: 'Sem 4', consistency: 80, barra: 7, flexao: 20 },
  { week: 'Sem 5', consistency: 90, barra: 8, flexao: 22 },
];

const exerciseProgress = [
  { name: 'Barra fixa', current: 8, target: 12, unit: 'reps' },
  { name: 'Flexão', current: 35, target: 50, unit: 'reps' },
  { name: 'Corrida 12min', current: 2200, target: 2800, unit: 'm' },
  { name: 'Abdominal', current: 40, target: 50, unit: 'reps' },
];

const simuladoHistory = [
  { date: '01/12', score: 65 },
  { date: '15/12', score: 72 },
  { date: '01/01', score: 78 },
  { date: '15/01', score: 85 },
];

export default function EvolutionPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Evolução</h1>
        <p className="text-muted-foreground">Acompanhe seu progresso ao longo do tempo</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card-elevated p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-sm">Evolução mensal</span>
          </div>
          <p className="text-2xl font-bold text-foreground">+23%</p>
        </div>
        <div className="card-elevated p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm">Constância</span>
          </div>
          <p className="text-2xl font-bold text-foreground">87%</p>
        </div>
        <div className="card-elevated p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Flame className="w-4 h-4 text-accent" />
            <span className="text-sm">Maior streak</span>
          </div>
          <p className="text-2xl font-bold text-foreground">14 dias</p>
        </div>
        <div className="card-elevated p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Dumbbell className="w-4 h-4 text-info" />
            <span className="text-sm">Total treinos</span>
          </div>
          <p className="text-2xl font-bold text-foreground">32</p>
        </div>
      </div>

      {/* Consistency Chart */}
      <div className="card-elevated p-5">
        <h3 className="font-semibold text-foreground mb-4">Constância semanal</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="consistency" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Exercise Progress */}
      <div className="card-elevated p-5">
        <h3 className="font-semibold text-foreground mb-4">Progresso por exercício</h3>
        <div className="space-y-4">
          {exerciseProgress.map((exercise, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-foreground font-medium">{exercise.name}</span>
                <span className="text-muted-foreground">
                  {exercise.current}/{exercise.target} {exercise.unit}
                </span>
              </div>
              <ProgressBar
                value={exercise.current}
                max={exercise.target}
                variant={exercise.current >= exercise.target ? 'success' : 'primary'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Performance Chart */}
      <div className="card-elevated p-5">
        <h3 className="font-semibold text-foreground mb-4">Evolução nos exercícios</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="barra"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))' }}
                name="Barra (reps)"
              />
              <Line
                type="monotone"
                dataKey="flexao"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--accent))' }}
                name="Flexão (reps)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Simulado History */}
      <div className="card-elevated p-5">
        <h3 className="font-semibold text-foreground mb-4">Histórico de simulados</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={simuladoHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="hsl(var(--success))"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--success))', strokeWidth: 2 }}
                name="Pontuação"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
