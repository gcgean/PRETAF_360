import { EmptyState } from '@/components/ui/EmptyState';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { MessageSquare, CheckCircle, Star } from 'lucide-react';

// Mock data
const mockFeedbacks = [
  {
    id: '1',
    coachName: 'Carlos Treinador',
    exerciseType: 'Barra fixa',
    date: '2024-01-14',
    technicalScore: 7,
    comment:
      'Ótima evolução! A pegada está correta e você está conseguindo manter o ritmo. Precisamos trabalhar um pouco mais a extensão completa dos braços na descida.',
    corrections: [
      'Estender completamente os braços antes de subir',
      'Manter o core ativado durante todo o movimento',
      'Evitar balançar o corpo',
    ],
  },
  {
    id: '2',
    coachName: 'Carlos Treinador',
    exerciseType: 'Flexão de braço',
    date: '2024-01-10',
    technicalScore: 8,
    comment:
      'Muito bom! A amplitude está ótima e a velocidade está controlada. Continue assim!',
    corrections: [
      'Manter quadril alinhado com os ombros',
      'Descer até o peito quase tocar o chão',
    ],
  },
  {
    id: '3',
    coachName: 'Ana Preparadora',
    exerciseType: 'Corrida',
    date: '2024-01-05',
    technicalScore: 6,
    comment:
      'A passada está boa, mas você está gastando muita energia nos primeiros minutos. Precisamos trabalhar o ritmo.',
    corrections: [
      'Começar em ritmo mais leve',
      'Aumentar velocidade gradualmente',
      'Focar na respiração',
    ],
  },
];

export default function FeedbackPage() {
  const renderStars = (score: number) => {
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < score ? 'text-warning fill-warning' : 'text-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Feedback</h1>
        <p className="text-muted-foreground">Correções e orientações do treinador</p>
      </div>

      {mockFeedbacks.length > 0 ? (
        <div className="space-y-4">
          {mockFeedbacks.map((feedback) => (
            <div key={feedback.id} className="card-elevated p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">
                      {feedback.coachName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{feedback.coachName}</p>
                    <p className="text-sm text-muted-foreground">
                      {feedback.exerciseType} •{' '}
                      {new Date(feedback.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <StatusBadge status="corrected" />
              </div>

              {/* Score */}
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-1">Nota técnica</p>
                <div className="flex items-center gap-2">
                  {renderStars(feedback.technicalScore)}
                  <span className="font-bold text-foreground">{feedback.technicalScore}/10</span>
                </div>
              </div>

              {/* Comment */}
              <div className="mb-4">
                <p className="text-foreground">{feedback.comment}</p>
              </div>

              {/* Corrections */}
              <div className="bg-secondary/50 rounded-lg p-4">
                <p className="text-sm font-medium text-foreground mb-3">Pontos para corrigir:</p>
                <ul className="space-y-2">
                  {feedback.corrections.map((correction, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{correction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={MessageSquare}
          title="Nenhum feedback ainda"
          description="Envie um vídeo para receber correções do treinador"
          action={{
            label: 'Enviar vídeo',
            onClick: () => {},
          }}
        />
      )}
    </div>
  );
}
