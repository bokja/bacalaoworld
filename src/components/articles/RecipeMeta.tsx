import { Timer, Clock, Users, ChefHat } from "lucide-react";

interface RecipeMetaProps {
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  servings?: string;
  difficulty?: string;
}

function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return iso;
  const hours = match[1] ? `${match[1]} t` : "";
  const minutes = match[2] ? `${match[2]} min` : "";
  return [hours, minutes].filter(Boolean).join(" ");
}

export function RecipeMeta({
  prepTime,
  cookTime,
  totalTime,
  servings,
  difficulty,
}: RecipeMetaProps) {
  const items = [
    prepTime && {
      icon: Timer,
      label: "Forberedelse",
      value: parseDuration(prepTime),
    },
    cookTime && {
      icon: Clock,
      label: "Steketid",
      value: parseDuration(cookTime),
    },
    totalTime && {
      icon: Clock,
      label: "Totalt",
      value: parseDuration(totalTime),
    },
    servings && { icon: Users, label: "Porsjoner", value: servings },
    difficulty && {
      icon: ChefHat,
      label: "Vanskelighetsgrad",
      value: difficulty,
    },
  ].filter(Boolean) as { icon: typeof Timer; label: string; value: string }[];

  if (items.length === 0) return null;

  return (
    <div className="mx-auto -mt-6 max-w-3xl px-4">
      <div className="recipe-meta-box grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <item.icon className="mx-auto h-5 w-5 text-warm-400" />
            <p className="mt-1 text-xs text-warm-500">{item.label}</p>
            <p className="mt-0.5 text-sm font-semibold text-warm-800">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
