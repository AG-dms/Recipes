export function isDefinedType<T>(value: T | undefined | null): value is T {
  return <T>value !== undefined && <T>value !== null;
}
