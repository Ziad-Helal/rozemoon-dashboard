export function clearFromState<T>(state: T[], key: keyof T, value: any) {
  const { prev, index } = findProduct(state, key, value);
  if (prev) state.splice(index, 1);
  return state;
}

export function modifyInState<T>(state: T[], key: keyof T, value: any, keyToBeModified: keyof T, valueDifference: number) {
  const { prev, index } = findProduct(state, key, value);
  if (prev) (state[index][keyToBeModified] as number) = valueDifference;
  else state.push({ [key]: value, [keyToBeModified]: valueDifference } as T);
  return state;
}

export function findProduct<T>(state: T[], key: keyof T, value: any) {
  let index = -1;
  const prev = state.find((prod, i) => {
    if (prod[key] == value) {
      index = i;
      return prod;
    }
  });
  return { prev, index };
}
