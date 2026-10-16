export type CardAccent = "red" | "orange" | "yellow" | "green" | "blue" | "default" | string;

export function getCardAccentClass(accent?: CardAccent): string {
  if (!accent) return "durozen-card-default";
  const lower = accent.toLowerCase();
  if (lower === "red" || lower.includes("e92b2b") || lower.includes("de2f28") || lower.includes("red")) return "durozen-card-red";
  if (lower === "yellow" || lower === "orange" || lower.includes("f9a916") || lower.includes("f4a81e") || lower.includes("yellow") || lower.includes("orange")) return "durozen-card-yellow";
  if (lower === "green" || lower.includes("4c9b35") || lower.includes("549b31") || lower.includes("green")) return "durozen-card-green";
  if (lower === "blue" || lower.includes("2647a5") || lower.includes("24419e") || lower.includes("blue")) return "durozen-card-blue";
  return "durozen-card-default";
}

