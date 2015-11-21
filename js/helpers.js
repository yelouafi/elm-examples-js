
export function targetValue(event) {
  return event.target.value;
}

export function pipe(...functions) {
  return arg => functions.reduce( (acc, fn) => acc = fn(acc), arg );
}
