export function findAllValues(
  object: any, key: string, value: string, arr: any[] = []
) {
  const containerObject = arr;
  if (object && object[key] === value) {
    containerObject.push(object);
  }

  // eslint-disable-next-line guard-for-in
  for (const property in object) {
    typeof object[property] === 'object' &&
      findAllValues(object[property], key, value, containerObject);
  }
  return containerObject;
}
