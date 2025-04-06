
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Loader2, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface UserAuthProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserAuth = ({ isOpen, onClose }: UserAuthProps) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const { login, register, isLoading } = useAuth();
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Registration form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRole, setRegisterRole] = useState<'farmer' | 'consumer'>('consumer');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(loginEmail, loginPassword);
    onClose();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({
      username: registerName,
      email: registerEmail,
      password: registerPassword,
      role: registerRole,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Welcome to FarmMarket</DialogTitle>
          <DialogDescription className="text-center">
            Connect directly with local farmers or sell your produce
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Create Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 pt-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <DialogFooter className="flex flex-col sm:flex-col gap-2 sm:gap-0">
                <Button 
                  type="submit" 
                  className="w-full bg-farm-green hover:bg-farm-green-dark"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Sign In
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  For demo, use:
                  <br />
                  farmer@example.com / consumer@example.com
                  <br />
                  password: password123
                </p>
              </DialogFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 pt-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="John Smith"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="register-email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="register-email"
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="register-password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="register-password"
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  I am a:
                </label>
                <div className="flex gap-4 pt-1">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="role-consumer"
                      name="role"
                      value="consumer"
                      checked={registerRole === 'consumer'}
                      onChange={() => setRegisterRole('consumer')}
                      className="mr-2"
                    />
                    <label htmlFor="role-consumer" className="text-sm">Consumer</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="role-farmer"
                      name="role"
                      value="farmer"
                      checked={registerRole === 'farmer'}
                      onChange={() => setRegisterRole('farmer')}
                      className="mr-2"
                    />
                    <label htmlFor="role-farmer" className="text-sm">Farmer</label>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex flex-col sm:flex-col gap-0">
                <Button 
                  type="submit" 
                  className="w-full bg-farm-green hover:bg-farm-green-dark"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Create Account
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  By creating an account, you agree to our
                  <br />
                  <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
                </p>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UserAuth;
