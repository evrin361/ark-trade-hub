import type { FormFieldProps } from "./FormField.types";



export function FormField({
  label,
  required,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
<label
  className="
    block
    text-sm
    font-medium
    text-[var(--text-primary)]
  "
>        {label}

        {required && (
          <span className="mr-1 text-[var(--danger)]">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}