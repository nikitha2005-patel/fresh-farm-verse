
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { DollarSign, Edit, Plus, Tag, DollarSign as Currency } from "lucide-react";

// Mock data for base prices
const initialBasePrices = [
  {
    id: "bp1",
    category: "Rice",
    variety: "Basmati",
    price: 80.00,
    unit: "kg",
    organic: true,
    lastUpdated: "2025-03-15T10:00:00Z"
  },
  {
    id: "bp2",
    category: "Wheat",
    variety: "Durum",
    price: 45.00,
    unit: "kg",
    organic: false,
    lastUpdated: "2025-03-12T09:30:00Z"
  },
  {
    id: "bp3",
    category: "Pulses",
    variety: "Red Lentils",
    price: 120.00,
    unit: "kg",
    organic: true,
    lastUpdated: "2025-03-10T14:20:00Z"
  },
  {
    id: "bp4",
    category: "Vegetables",
    variety: "Organic Tomatoes",
    price: 60.00,
    unit: "kg",
    organic: true,
    lastUpdated: "2025-03-05T11:45:00Z"
  },
];

// Categories for the form
const categories = ["Rice", "Wheat", "Pulses", "Vegetables", "Fruits", "Spices"];
const units = ["kg", "g", "dozen", "piece", "quintal", "ton"];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const BasePriceSettings = () => {
  const [basePrices, setBasePrices] = useState(initialBasePrices);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentBasePrice, setCurrentBasePrice] = useState<any>(null);
  
  // Form state for add/edit
  const [formData, setFormData] = useState({
    id: "",
    category: "",
    variety: "",
    price: "",
    unit: "kg",
    organic: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const resetForm = () => {
    setFormData({
      id: "",
      category: "",
      variety: "",
      price: "",
      unit: "kg",
      organic: false
    });
  };

  const handleAddBasePrice = () => {
    // Validate form
    if (!formData.category || !formData.variety || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newBasePrice = {
      id: `bp${Date.now()}`,
      category: formData.category,
      variety: formData.variety,
      price: parseFloat(formData.price),
      unit: formData.unit,
      organic: formData.organic,
      lastUpdated: new Date().toISOString()
    };

    setBasePrices([...basePrices, newBasePrice]);
    toast.success("Base price added successfully");
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditClick = (basePrice: any) => {
    setCurrentBasePrice(basePrice);
    setFormData({
      id: basePrice.id,
      category: basePrice.category,
      variety: basePrice.variety,
      price: basePrice.price.toString(),
      unit: basePrice.unit,
      organic: basePrice.organic
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateBasePrice = () => {
    // Validate form
    if (!formData.category || !formData.variety || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updatedBasePrices = basePrices.map(price => 
      price.id === formData.id 
        ? {
            ...price,
            category: formData.category,
            variety: formData.variety,
            price: parseFloat(formData.price),
            unit: formData.unit,
            organic: formData.organic,
            lastUpdated: new Date().toISOString()
          }
        : price
    );

    setBasePrices(updatedBasePrices);
    toast.success("Base price updated successfully");
    resetForm();
    setIsEditDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Base Price Settings</CardTitle>
          <CardDescription>Set base prices for your crops</CardDescription>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-farm-green hover:bg-farm-green-dark">
              <Plus className="mr-2 h-4 w-4" /> Add Base Price
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Base Price</DialogTitle>
              <DialogDescription>
                Set a base price for a crop variety. This will be used as a reference for auctions and direct sales.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="variety">Variety</Label>
                  <Input 
                    id="variety" 
                    name="variety"
                    value={formData.variety}
                    onChange={handleInputChange}
                    placeholder="e.g. Basmati"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="price" 
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="pl-10" 
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select 
                    value={formData.unit}
                    onValueChange={(value) => handleSelectChange('unit', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map(unit => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="organic"
                  name="organic"
                  checked={formData.organic}
                  onChange={handleInputChange}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="organic">Organic Certified</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBasePrice} className="bg-farm-green hover:bg-farm-green-dark">
                Add Base Price
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Base Price</DialogTitle>
              <DialogDescription>
                Update the base price for this crop variety.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="variety">Variety</Label>
                  <Input 
                    id="variety" 
                    name="variety"
                    value={formData.variety}
                    onChange={handleInputChange}
                    placeholder="e.g. Basmati"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="price" 
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="pl-10" 
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select 
                    value={formData.unit}
                    onValueChange={(value) => handleSelectChange('unit', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map(unit => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="organic"
                  name="organic"
                  checked={formData.organic}
                  onChange={handleInputChange}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="organic">Organic Certified</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateBasePrice} className="bg-farm-green hover:bg-farm-green-dark">
                Update Price
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Variety</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {basePrices.map((price) => (
              <TableRow key={price.id}>
                <TableCell>{price.category}</TableCell>
                <TableCell>{price.variety}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Currency className="h-4 w-4 mr-1 text-muted-foreground" />
                    {price.price.toFixed(2)} / {price.unit}
                  </div>
                </TableCell>
                <TableCell>
                  {price.organic ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Organic
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Conventional
                    </span>
                  )}
                </TableCell>
                <TableCell>{formatDate(price.lastUpdated)}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleEditClick(price)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BasePriceSettings;
