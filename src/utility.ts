export function replaceItem<T>(
  items: T[],
  index: number,
  scenario: T | null
): T[] {
  const [start, end] = [
    [...items.slice(0, index)],
    [...items.slice(index + 1)],
  ];
  const newItems = scenario
    ? [...start, scenario, ...end]
    : [...start, ...end];
  return newItems;
}
