import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Mail,
  Calendar,
  Crown,
  ChevronRight,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const planDetails = {
  FREE: { color: 'bg-secondary', label: 'Gratuito' },
  PRO: { color: 'bg-primary', label: 'Pro' },
  PREMIUM: { color: 'bg-accent', label: 'Premium' },
  ELITE: { color: 'bg-gradient-to-r from-warning to-accent', label: 'Elite' },
};

export default function ProfilePage() {
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: Bell, label: 'Notificações', href: '#' },
    { icon: Shield, label: 'Privacidade', href: '#' },
    { icon: HelpCircle, label: 'Ajuda', href: '#' },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Perfil</h1>
        <p className="text-muted-foreground">Gerencie sua conta</p>
      </div>

      {/* User Info Card */}
      <div className="card-elevated p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">{user?.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{user?.email}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Membro desde {new Date(user?.createdAt || '').toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
      </div>

      {/* Subscription Card */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Sua assinatura</h3>
          <Badge
            className={cn(
              'font-semibold text-primary-foreground',
              planDetails[user?.subscription || 'FREE'].color
            )}
          >
            <Crown className="w-3 h-3 mr-1" />
            {planDetails[user?.subscription || 'FREE'].label}
          </Badge>
        </div>

        {user?.subscription === 'FREE' && (
          <div className="bg-primary/5 rounded-lg p-4 mb-4">
            <p className="text-sm text-foreground mb-3">
              Desbloqueie todos os recursos com um plano premium
            </p>
            <Link to="/planos">
              <Button variant="gradient" size="sm">
                Ver planos
              </Button>
            </Link>
          </div>
        )}

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Treinos por semana</span>
            <span className="font-medium text-foreground">
              {user?.subscription === 'FREE' ? '3' : 'Ilimitado'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Correções de vídeo</span>
            <span className="font-medium text-foreground">
              {user?.subscription === 'FREE'
                ? '0/mês'
                : user?.subscription === 'PRO'
                ? '2/mês'
                : 'Ilimitado'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Simulados</span>
            <span className="font-medium text-foreground">
              {user?.subscription === 'FREE' ? '1/mês' : 'Ilimitado'}
            </span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="card-elevated overflow-hidden">
        {menuItems.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              'flex items-center gap-4 px-5 py-4 hover:bg-secondary/50 transition-colors',
              index !== menuItems.length - 1 && 'border-b border-border'
            )}
          >
            <item.icon className="w-5 h-5 text-muted-foreground" />
            <span className="flex-1 font-medium text-foreground">{item.label}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </a>
        ))}
      </div>

      {/* Logout */}
      <Button
        variant="outline"
        className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
        onClick={logout}
      >
        <LogOut className="w-5 h-5 mr-2" />
        Sair da conta
      </Button>
    </div>
  );
}
