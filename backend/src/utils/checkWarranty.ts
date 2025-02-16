const checkWarranty = (date: string) => {
  const timeCurr = new Date();
  const timeEnd = new Date(date);

  // Reset hours to 00:00:00 for accurate day comparison
  timeCurr.setHours(0, 0, 0, 0);
  timeEnd.setHours(0, 0, 0, 0);

  // Calculate time diff
  const msDiff = timeEnd.getTime() - timeCurr.getTime();
  const dayDiff = Math.ceil(msDiff / (1000 * 60 * 60 * 24));

  // Adjust dayLeft format
  const daysLeft = dayDiff >= 0 ? dayDiff + 1 : dayDiff;

  // Define warranty status
  let isWarranty: "warranty" | "nearExpire" | "expired" = "warranty";

  // isWaranty condition
  if (daysLeft >= 30) {
    isWarranty = "warranty";
  } else if (daysLeft >= 0 && daysLeft < 30) {
    isWarranty = "nearExpire";
  } else {
    isWarranty = "expired";
  }

  // Return dayLeft and warranty status
  return { daysLeft, isWarranty };
};

export default checkWarranty;
