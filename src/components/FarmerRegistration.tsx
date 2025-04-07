import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Warehouse,
  Ruler,
  Plus,
  X,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

// For a real app, these would come from an API or config
const cropCategories = [
  "Rice",
  "Wheat",
  "Pulses",
  "Vegetables",
  "Fruits",
  "Spices",
  "Cotton",
  "Oilseeds",
  "Tea",
  "Coffee",
  "Coconut"
];

const FarmerRegistration = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  
  // Basic auth details
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Personal details
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  
  // Farm details
  const [farmName, setFarmName] = useState('');
  const [farmLocation, setFarmLocation] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [farmingExperience, setFarmingExperience] = useState('');
  const [establishedYear, setEstablishedYear] = useState('');
  const [isOrganic, setIsOrganic] = useState(false);
  
  // Specialties
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [currentSpecialty, setCurrentSpecialty] = useState('');

  // Bank details
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  // Form steps
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const addSpecialty = () => {
    if (currentSpecialty && !specialties.includes(currentSpecialty)) {
      setSpecialties([...specialties, currentSpecialty]);
      setCurrentSpecialty('');
    }
  };

  const removeSpecialty = (specialty: string) => {
    setSpecialties(specialties.filter(s => s !== specialty));
  };

  const nextStep = () => {
    if (step === 1) {
      // Validate basic details
      if (!email || !password || !confirmPassword) {
        toast.error("Please fill in all required fields");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }
    }
    
    if (step === 2) {
      // Validate personal details
      if (!fullName || !phone) {
        toast.error("Please fill in all required fields");
        return;
      }
    }
    
    if (step === 3) {
      // Validate farm details
      if (!farmName) {
        toast.error("Farm name is required");
        return;
      }
    }
    
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // In a real app, we'd send all this farmer data to the backend
      // Here we're just using the basic registration
      await register({
        username: fullName,
        email,
        password,
        role: 'farmer',
      });
      
      toast.success('Registration successful!');
      navigate('/farmer');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Farmer Registration</CardTitle>
        <CardDescription>
          Create your farmer account to sell products and participate in auctions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div 
                key={i}
                className={`flex items-center justify-center rounded-full w-8 h-8 ${
                  i + 1 === step 
                    ? 'bg-farm-green text-white' 
                    : i + 1 < step 
                      ? 'bg-farm-green/20 text-farm-green'
                      : 'bg-muted text-muted-foreground'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-farm-green transition-all duration-300 ease-in-out"
              style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        <form>
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Details</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters long
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      placeholder="John Smith"
                      className="pl-10"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      className="pl-10"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    placeholder="Full address"
                    className="pl-10"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself and your farming experience..."
                  className="min-h-[100px]"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Farm Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmName">Farm Name</Label>
                  <div className="relative">
                    <Warehouse className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="farmName"
                      placeholder="Your Farm Name"
                      className="pl-10"
                      value={farmName}
                      onChange={(e) => setFarmName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmLocation">Farm Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="farmLocation"
                      placeholder="Farm location"
                      className="pl-10"
                      value={farmLocation}
                      onChange={(e) => setFarmLocation(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmSize">Farm Size (acres)</Label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="farmSize"
                      type="text"
                      placeholder="e.g. 25 acres"
                      className="pl-10"
                      value={farmSize}
                      onChange={(e) => setFarmSize(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmingExperience">Farming Experience (years)</Label>
                  <Input
                    id="farmingExperience"
                    type="number"
                    placeholder="e.g. 10"
                    value={farmingExperience}
                    onChange={(e) => setFarmingExperience(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="establishedYear">Established Year</Label>
                  <Input
                    id="establishedYear"
                    placeholder="e.g. 2010"
                    value={establishedYear}
                    onChange={(e) => setEstablishedYear(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Switch 
                    id="isOrganic"
                    checked={isOrganic}
                    onCheckedChange={setIsOrganic}
                  />
                  <Label htmlFor="isOrganic">Certified Organic Farm</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Crop Specialties</Label>
                <div className="flex items-center space-x-2">
                  <Select
                    value={currentSpecialty}
                    onValueChange={setCurrentSpecialty}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select crop category" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    size="icon"
                    onClick={addSpecialty}
                    disabled={!currentSpecialty}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {specialties.map((specialty) => (
                    <div
                      key={specialty}
                      className="flex items-center bg-muted px-3 py-1 rounded-full text-sm"
                    >
                      {specialty}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 ml-1"
                        onClick={() => removeSpecialty(specialty)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Bank Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Holder Name</Label>
                  <Input
                    id="accountName"
                    placeholder="Name as per bank records"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    placeholder="e.g. State Bank of India"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Your account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input
                    id="ifscCode"
                    placeholder="e.g. SBIN0001234"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2">Review your information</h4>
                <p className="text-sm text-muted-foreground">
                  Please ensure all details are correct before submitting. You'll be able to edit this information later from your profile.
                </p>
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline"
          onClick={prevStep}
          disabled={step === 1}
        >
          Back
        </Button>
        {step < totalSteps ? (
          <Button onClick={nextStep}>
            Continue
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-farm-green hover:bg-farm-green-dark"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Complete Registration
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FarmerRegistration;
