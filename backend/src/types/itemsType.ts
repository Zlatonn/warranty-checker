export interface Items {
  id: number;
  itemName: string;
  serialNumber: string;
  endDate: string;
  notes: string;
  remainDays: number;
  isWarranty: "warranty" | "nearExpire" | "expired";
}
