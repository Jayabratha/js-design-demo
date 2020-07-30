export function debounce(func: () => void, delay: number) {
  let debounceTimer: any;
  return function(this: any) {
    const context = this;
    const args: any = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}
