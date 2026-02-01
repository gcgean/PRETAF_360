import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { EmptyState } from '@/components/ui/EmptyState';
import { StatusBadge } from '@/components/ui/StatusBadge';
import {
  Video,
  Upload,
  CheckCircle,
  Clock,
  FileVideo,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const exerciseTypes = [
  { id: 'barra', label: 'Barra fixa', icon: '💪' },
  { id: 'flexao', label: 'Flexão de braço', icon: '🏋️' },
  { id: 'corrida', label: 'Corrida', icon: '🏃' },
  { id: 'natacao', label: 'Natação', icon: '🏊' },
];

// Mock data
const mockSubmissions = [
  {
    id: '1',
    exerciseType: 'barra',
    status: 'corrected' as const,
    submittedAt: '2024-01-12',
    description: 'Tentando melhorar a pegada',
  },
  {
    id: '2',
    exerciseType: 'flexao',
    status: 'analyzing' as const,
    submittedAt: '2024-01-14',
    description: 'Verificar amplitude do movimento',
  },
];

export default function VideoUploadPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 100 * 1024 * 1024) {
        toast({
          title: 'Arquivo muito grande',
          description: 'O tamanho máximo é 100MB',
          variant: 'destructive',
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!selectedType || !file) return;

    setIsUploading(true);
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsUploading(false);

    toast({
      title: 'Vídeo enviado!',
      description: 'Você receberá o feedback em breve.',
    });

    // Reset form
    setSelectedType(null);
    setDescription('');
    setFile(null);
  };

  const getExerciseLabel = (type: string) => {
    return exerciseTypes.find((e) => e.id === type)?.label || type;
  };

  const getExerciseIcon = (type: string) => {
    return exerciseTypes.find((e) => e.id === type)?.icon || '📹';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Enviar vídeo</h1>
        <p className="text-muted-foreground">Receba correção técnica do treinador</p>
      </div>

      {/* Upload Form */}
      <div className="card-elevated p-5">
        <h3 className="font-semibold text-foreground mb-4">Novo envio</h3>

        {/* Exercise Type Selection */}
        <div className="space-y-3 mb-5">
          <Label>Tipo de exercício</Label>
          <div className="grid grid-cols-2 gap-3">
            {exerciseTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={cn(
                  'p-4 rounded-xl border-2 text-center transition-all',
                  selectedType === type.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/30 bg-card'
                )}
              >
                <span className="text-2xl block mb-1">{type.icon}</span>
                <span className="text-sm font-medium text-foreground">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* File Upload */}
        <div className="space-y-3 mb-5">
          <Label>Vídeo</Label>
          {!file ? (
            <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
              <Upload className="w-10 h-10 text-muted-foreground mb-3" />
              <span className="text-sm font-medium text-foreground">
                Clique para selecionar
              </span>
              <span className="text-xs text-muted-foreground mt-1">MP4, MOV até 100MB</span>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary">
              <FileVideo className="w-8 h-8 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={() => setFile(null)}
                className="p-2 rounded-lg hover:bg-background transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-3 mb-5">
          <Label htmlFor="description">Descrição (opcional)</Label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Sinto dor no ombro durante a execução..."
            className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none h-24 focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Submit Button */}
        <Button
          variant="gradient"
          size="lg"
          className="w-full"
          onClick={handleSubmit}
          disabled={!selectedType || !file || isUploading}
        >
          {isUploading ? (
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <>
              <Video className="w-5 h-5 mr-2" />
              Enviar para correção
            </>
          )}
        </Button>
      </div>

      {/* Previous Submissions */}
      <div className="card-elevated p-5">
        <h3 className="font-semibold text-foreground mb-4">Envios anteriores</h3>
        {mockSubmissions.length > 0 ? (
          <div className="space-y-3">
            {mockSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50"
              >
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-2xl">
                  {getExerciseIcon(submission.exerciseType)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">
                      {getExerciseLabel(submission.exerciseType)}
                    </span>
                    <StatusBadge status={submission.status} />
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {submission.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enviado em {new Date(submission.submittedAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Video}
            title="Nenhum vídeo enviado"
            description="Envie seu primeiro vídeo para receber feedback do treinador"
          />
        )}
      </div>
    </div>
  );
}
