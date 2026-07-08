import { cardRecipe } from "@/config/theme/recipes/card";
import { CardProps } from "./Card.types";

export function Card({
  children,
  variant = "default",
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`
  ${cardRecipe(variant)}
  p-6
  ${className}
`}
      {...props}
    >
      {children}
    </div>
  );
}