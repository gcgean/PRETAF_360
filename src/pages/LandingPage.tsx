import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Target,
  CheckCircle,
  Play,
  Users,
  Video,
  LineChart,
  Shield,
  Crown,
  ArrowRight,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
  {
    id: 'PRO',
    name: 'Pro',
    price: 49.90,
    features: ['Treinos ilimitados', '2 correções de vídeo/mês', 'Simulados ilimitados', 'Calendário personalizado'],
  },
  {
    id: 'PREMIUM',
    name: 'Premium',
    price: 89.90,
    highlighted: true,
    features: ['Tudo do Pro', '5 correções de vídeo/mês', 'Feedback prioritário', 'Plano personalizado'],
  },
  {
    id: 'ELITE',
    name: 'Elite',
    price: 149.90,
    features: ['Tudo do Premium', 'Correções ilimitadas', 'Acompanhamento 1:1', 'Suporte WhatsApp'],
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Target className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">PRE TAF 360</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link to="/signup">
              <Button variant="gradient">Começar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-hero">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="outline" className="mb-4">
            <Star className="w-3 h-3 mr-1 text-warning" /> +500 aprovados
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Passe no TAF com{' '}
            <span className="text-gradient-primary">acompanhamento real</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Treino específico, correção técnica por vídeo e constância garantida. 
            Sua aprovação começa aqui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="gradient" size="xl">
                Começar agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="xl">
              <Play className="w-5 h-5 mr-2" />
              Ver como funciona
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Tudo que você precisa para passar
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: LineChart, title: 'Plano personalizado', desc: 'Treinos adaptados ao seu nível e objetivo' },
              { icon: Video, title: 'Correção por vídeo', desc: 'Envie vídeos e receba feedback técnico' },
              { icon: Users, title: 'Acompanhamento', desc: 'Treinadores dedicados à sua evolução' },
            ].map((f, i) => (
              <div key={i} className="card-elevated p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">Escolha seu plano</h2>
          <p className="text-center text-muted-foreground mb-12">Comece hoje e conquiste sua aprovação</p>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.id} className={cn('card-elevated p-6 relative', plan.highlighted && 'ring-2 ring-primary')}>
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">Mais popular</Badge>
                )}
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-foreground">R$ {plan.price.toFixed(2)}</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/signup">
                  <Button variant={plan.highlighted ? 'gradient' : 'outline'} className="w-full">
                    Assinar {plan.name}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2024 PRE TAF 360. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
