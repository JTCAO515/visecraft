import type { ZodError } from "zod";

export type FieldErrors<TField extends string = string> = Partial<Record<TField, string>>;

export function mapZodErrors<TField extends string = string>(error: ZodError): FieldErrors<TField> {
  const errors: FieldErrors<TField> = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && !errors[field as TField]) {
      errors[field as TField] = issue.message;
    }
  }

  return errors;
}
