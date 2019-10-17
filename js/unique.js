// 双重循环
var unique = function(array) {
  var result = []

  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < result.length; j++) {
      if (array[i] === result[j]) {
        break
      }
    }
    if (j === result.length) {
      result.push(array[i])
    }
  }
  return result
}


// indexOf
const unique2 = (array) => {
  let result = []

  for (let i = 0; i < array.length; i++) {
    let current = array[i]
    if (result.indexOf(current) === -1) {
      result.push(array[i])
    }
  }
  return result
}


// 排序后去重
const unique3 = (array) => {
  let result = []
  let sortedArr = array.concat().sort()
  let seen

  for (let i = 0; i < array.length; i++) {
    if (!i || seen !== sortedArr[i]) {
      result.push(sortedArr[i])
    }
    seen = sortedArr[i]
  }
  return result
}


// Filter
const unique4 = (array) => {
  let result = array.filter((item, index) => {
    return array.indexOf(item) === index
  })
  return result
}


// Set
const unique5 = (array) => {
  return [...new Set(array)]
}


console.log(unique5([1, 2, 3, 4, 2, 1]))