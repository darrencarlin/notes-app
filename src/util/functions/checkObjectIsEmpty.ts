export const checkIfObjectIsEmpty = (obj: any): boolean =>
  Object.keys(obj).length === 0 || obj.id === "";
