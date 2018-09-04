const DeclNum = function (el, binding) {
  let number = binding.value[1]
  let titles = binding.value[0]
  let cases = [2, 0, 1, 1, 1, 2]
  let setTitle = () => {
    return (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]
  }
  el.innerHTML = (titles[setTitle()])
}

export default DeclNum
