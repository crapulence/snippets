import { checkAuthorization } from './checkAuthorization'

export default Vue => {
  Vue.directive('permission', {
    inserted(el, binding) {
      if (!checkAuthorization(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  })
}
