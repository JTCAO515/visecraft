export type ApiErrorPayload = {
  error: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string>;
  };
};

export class ApiError extends Error {
  readonly code: string;
  readonly status: number;
  readonly fieldErrors?: Record<string, string>;

  constructor({ code, message, status, fieldErrors }: { code: string; message: string; status: number; fieldErrors?: Record<string, string> }) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export async function apiFetch<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(input, init);
  } catch {
    throw new ApiError({
      code: "network_error",
      message: "The service could not be reached. Check your connection and try again.",
      status: 0,
    });
  }

  const payload = await parseJson(response);

  if (!response.ok) {
    const error = readApiError(payload);
    throw new ApiError({
      code: error?.code ?? "request_failed",
      message: error?.message ?? `The request failed with status ${response.status}.`,
      status: response.status,
      fieldErrors: error?.fieldErrors,
    });
  }

  return payload as T;
}

async function parseJson(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return undefined;

  try {
    return await response.json();
  } catch {
    if (response.ok) return undefined;
    throw new ApiError({
      code: "invalid_response",
      message: "The service returned an unreadable response.",
      status: response.status,
    });
  }
}

function readApiError(payload: unknown): ApiErrorPayload["error"] | undefined {
  if (!payload || typeof payload !== "object" || !("error" in payload)) return undefined;
  const error = payload.error;
  if (!error || typeof error !== "object" || !("code" in error) || !("message" in error)) return undefined;
  if (typeof error.code !== "string" || typeof error.message !== "string") return undefined;
  return error as ApiErrorPayload["error"];
}
