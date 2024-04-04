export function classes(styles: Record<string, boolean>) {
  return Object.keys(styles).filter(it => styles[it]).join(" ");
}