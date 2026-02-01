import { cn } from '@/lib/utils';
import { Badge } from './badge';

type Status = 'pending' | 'completed' | 'missed' | 'analyzing' | 'corrected';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  pending: {
    label: 'Pendente',
    className: 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/20',
  },
  completed: {
    label: 'Concluído',
    className: 'bg-success/10 text-success border-success/20 hover:bg-success/20',
  },
  missed: {
    label: 'Perdido',
    className: 'bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20',
  },
  analyzing: {
    label: 'Analisando',
    className: 'bg-info/10 text-info border-info/20 hover:bg-info/20',
  },
  corrected: {
    label: 'Corrigido',
    className: 'bg-success/10 text-success border-success/20 hover:bg-success/20',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge
      variant="outline"
      className={cn('font-medium', config.className, className)}
    >
      {config.label}
    </Badge>
  );
}
