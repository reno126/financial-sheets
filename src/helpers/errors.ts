export function anyToError(anyType: unknown): Error {
  if (anyType instanceof Error) {
    return anyType;
  }

  let stringified = '[Impossible to stringify]';

  try {
    stringified = JSON.stringify(anyType);
  } catch {}

  return new Error(`Error placeholder. Original error value: ${stringified}`);
}
