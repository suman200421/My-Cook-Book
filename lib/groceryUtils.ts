export type GroceryItem = {
  name: string;
  unit: string;
  quantity: number;
};

export function parseIngredient(text: string): GroceryItem {
  const parts = text.toLowerCase().split(" ");

  const quantity = parseFloat(parts[0]);
  const unit = isNaN(quantity) ? "pcs" : parts[1];
  const name = isNaN(quantity)
    ? parts.join(" ")
    : parts.slice(2).join(" ");

  return {
    name: name.trim(),
    unit: unit || "pcs",
    quantity: isNaN(quantity) ? 1 : quantity,
  };
}

export function mergeIngredients(items: string[]): GroceryItem[] {
  const map = new Map<string, GroceryItem>();

  items.forEach((item) => {
    const cleaned = item.trim();
    const parsed = parseIngredient(cleaned);
    const key = `${parsed.name}-${parsed.unit}`;

    if (map.has(key)) {
      map.get(key)!.quantity += parsed.quantity;
    } else {
      map.set(key, parsed);
    }
  });

  return Array.from(map.values());
}
