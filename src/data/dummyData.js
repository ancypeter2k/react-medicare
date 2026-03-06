export const procedures = [
  {
    id: 1,
    code: "56220",
    name: "CT Cervical Spine without Contrast",
    category: "CTC - CT Cervical",
    feeLevel: "Medicare",
    amount: 250.56,
    gap: 0.0,
  },
  {
    id: 2,
    code: "56221",
    name: "CT Cervical Spine with Contrast",
    category: "CTC - CT Cervical",
    feeLevel: "Private",
    amount: 320.75,
    gap: 15.0,
  },
];

export const locations = [
  { id: 1, code: "NSW", name: "New South Wales Clinic" },
  { id: 2, code: "QLD", name: "Queensland Diagnostic Center" },
  { id: 3, code: "VIC", name: "Victoria Imaging" },
  { id: 4, code: "WA", name: "Western Australia Radiology" },
];

export const feeLevels = [
  { id: 1, label: "Medicare" },
  { id: 2, label: "Private" },
  { id: 3, label: "Bulk Billed" },
  { id: 4, label: "Corporate" },
];
