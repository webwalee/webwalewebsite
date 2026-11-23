export const packages = [
  { name: "Starter Website", price: 4999, description: "A polished home for your new venture.", deliverables: ["Up to 5 pages", "Responsive design", "WhatsApp contact", "Search-ready foundation"] },
  { name: "Business Website", price: 7999, description: "A complete website built to grow with you.", deliverables: ["Up to 8 pages", "Custom design", "Enquiry forms", "Search-ready foundation"] },
  { name: "Premium Website", price: 11999, description: "A standout digital experience, made for your brand.", deliverables: ["Up to 12 pages", "Premium custom design", "Priority delivery", "Launch support"] },
  { name: "E-commerce Website", price: 14999, description: "A beautiful storefront ready for your next customer.", deliverables: ["Product catalogue", "Shopping cart", "Checkout setup", "Guided handover"], startingAt: true },
];

export function formatRupees(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}