
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const vehicleTypes = [
  { id: "tata-ace", name: "Tata Ace" },
  { id: "407", name: "407" },
  { id: "14-feet", name: "14 Feet" },
  { id: "709", name: "709" },
  { id: "1109", name: "1109" },
  { id: "20-feet", name: "20 Feet" },
  { id: "22-feet", name: "22 Feet" },
];

export const VehicleTypeSelect = ({ form }: { form: any }) => {
  return (
    <FormField
      control={form.control}
      name="vehicleType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Vehicle Type (Optional)</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {vehicleTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
