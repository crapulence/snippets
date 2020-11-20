export function $(selector, context = document) {
  return [...context.querySelectorAll(selector)]
}
