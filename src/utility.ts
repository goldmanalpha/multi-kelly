export function replaceItem<T>(
  items: T[],
  index: number,
  item: T | null
): T[] {
  const newArray = [...items];

  newArray.splice(index, 1);

  if (item) {
    newArray.splice(index, 0, item);
  }

  return newArray;
}
