import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ChevronLeft, ChevronRight, Dumbbell } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data
const mockCalendarData: Record<string, { status: 'completed' | 'pending' | 'missed'; title: string }> = {
  '2024-01-08': { status: 'completed', title: 'Treino de Força - Superiores' },
  '2024-01-09': { status: 'completed', title: 'Corrida Intervalada' },
  '2024-01-10': { status: 'completed', title: 'Treino de Força - Core' },
  '2024-01-11': { status: 'missed', title: 'Treino de Resistência' },
  '2024-01-12': { status: 'completed', title: 'Barra e Flexão' },
  '2024-01-13': { status: 'completed', title: 'Descanso Ativo' },
  '2024-01-14': { status: 'completed', title: 'Corrida Longa' },
  '2024-01-15': { status: 'pending', title: 'Treino de Força - Superiores' },
  '2024-01-16': { status: 'pending', title: 'Corrida Intervalada' },
  '2024-01-17': { status: 'pending', title: 'Treino de Força - Core' },
};

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 15)); // January 2024
  const [selectedDate, setSelectedDate] = useState<string | null>('2024-01-15');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const formatDateKey = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const selectedTraining = selectedDate ? mockCalendarData[selectedDate] : null;

  const getStatusColor = (status: 'completed' | 'pending' | 'missed') => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'missed':
        return 'bg-destructive text-destructive-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Calendário</h1>
        <p className="text-muted-foreground">Acompanhe sua programação de treinos</p>
      </div>

      {/* Calendar */}
      <div className="card-elevated p-4 md:p-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-lg font-semibold text-foreground">
            {MONTHS[month]} {year}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before first of month */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Days of month */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateKey = formatDateKey(day);
            const training = mockCalendarData[dateKey];
            const isSelected = selectedDate === dateKey;
            const isToday = dateKey === '2024-01-15';

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(dateKey)}
                className={cn(
                  'aspect-square rounded-lg flex flex-col items-center justify-center relative transition-all',
                  isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary',
                  isToday && !isSelected && 'ring-2 ring-primary'
                )}
              >
                <span className={cn('text-sm font-medium', !isSelected && 'text-foreground')}>
                  {day}
                </span>
                {training && (
                  <div
                    className={cn(
                      'w-2 h-2 rounded-full mt-1',
                      isSelected ? 'bg-primary-foreground' : getStatusColor(training.status)
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-xs text-muted-foreground">Concluído</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-xs text-muted-foreground">Pendente</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-xs text-muted-foreground">Perdido</span>
          </div>
        </div>
      </div>

      {/* Selected Day Details */}
      {selectedDate && (
        <div className="card-elevated p-5 animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">
              {new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </h3>
            {selectedTraining && <StatusBadge status={selectedTraining.status} />}
          </div>

          {selectedTraining ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{selectedTraining.title}</p>
                  <p className="text-sm text-muted-foreground">~45 minutos</p>
                </div>
              </div>

              {selectedTraining.status === 'pending' && (
                <Link to="/dashboard/treinos">
                  <button className="w-full py-3 rounded-lg bg-gradient-primary text-primary-foreground font-semibold shadow-primary hover:opacity-90 transition-opacity">
                    Iniciar treino
                  </button>
                </Link>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              Nenhum treino programado para este dia
            </p>
          )}
        </div>
      )}
    </div>
  );
}
