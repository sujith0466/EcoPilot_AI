export function formatCarbon(value: number | string | undefined | null): string {
  return (Number(value) || 0).toFixed(1);
}
