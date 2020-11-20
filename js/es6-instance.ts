// Mock
const users = [{
  username: 'Kelly',
  isVIP: true,
  balance: 20
}, {
  username: 'Tom',
  isVIP: false,
  balance: 19
}, {
  username: 'Stephanie',
  isVIP: true,
  balance: 30
}]

const users = [{
  name: 'Jim',
  age: 23
}, {
  name: 'Lily',
  age: 17
},{
  name: 'Will',
  age: 25
}]

const users = [{
  name: 'Adam',
  age: 30,
  sex: 'male'
}, {
  name: 'Helen',
  age: 27,
  sex: 'female'
}, {
  name: 'Amy',
  age: 25,
  sex: 'female'
}, {
  name: 'Anthony',
  age: 23,
  sex: 'male'
}]

const houses = [
  'Eddard Stark',
  'Catelyn Stark',
  'Rickard Stark',
  'Brandon Stark',
  'Rob Stark',
  'Sansa Stark',
  'Arya Stark',
  'Bran Stark',
  'Rickon Stark',
  'Lyanna Stark',
  'Tywin Lannister',
  'Cersei Lannister',
  'Jaime Lannister',
  'Tyrion Lannister',
  'Joffrey Baratheon'
]

const randomStr = 'hdjrwqpi'

const numList = [1, 3, 11, 4, 2, 5, 6, 7]

function isExist (fruit) {
  const fruits = ['apple', 'strawberry', 'cherry', 'cranberries']
  return fruits.includes(fruit)
}

function uniqueArray (array) {
  return [...new Set(array)]
}

function uniqueString (string) {
  return [...new Set(string)].join('')
}

function unionArray (a, b) {
  return new Set([...a, ...b])
}

function intersectArray(a, b) {
  return new Set([...a].filter(x => b.has(x)))
}

function differenceArray(a, b) {
  return new Set([...a].filter(x => !b.has(x)))
}

function sumArray (array) {
  return array.reduce((a, b) => a + b)
}

function compose (...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

function last (array) {
  const head = array => array[0]
  const reverse = array => [...array.reverse()]
  
  return compose(head, reverse)
}

function lastAndUpper (array) {
  const head = array => array[0]
  const reverse = array => [...array.reverse()]
  const toUpperCase = string => string.toUpperCase()

  return compose(toUpperCase, head, reverse)
}

// 将数组中的 false值去除
function compact (array) {
  return array.filter(Boolean)
}

// 将数组中的 VIP 用户余额加 10
function addVipUserBalance (users) {
  return users.map(user => user.isVIP ? {
    ...user,
    balance: user.balance + 10
  } : user)
}

// 判断字符串中是否含有元音字母
function containsVowel (str) {
  const isVowel = char => ['a', 'e', 'i', 'o', 'u'].includes(char)
  return [...str].some(isVowel)

  // 更优雅的方案
  // const containsVowel = str => /aeiou/.test(str)
}

// 判断用户是否全部是成年人
function isAllAdult (users) {
  return users.every(user => user.age >= 18)
}

//  找出上面用户中的第一个未成年人
function findTeen (users) {
  return users.find(user => user.age < 18)
}

// 生成由随机整数组成的数组
function genNumArr (length, limit) {
  return Array.from({ length }, _ => Math.floor(Math.random() * limit))
}

// 将多层数组转换成一层数组
function flatten (array) {
  return array.reduce((flat, next) => flat.concat(Array.isArray(next) ? flatten(next) : next), [])
}

// 数组转成对象 key/value 对应里层数组的两个值
function fromPairs (pairs) {
  return pairs.reduce((res, pair) => ((res[pair[0]] = pair[1]), res), {})
}

// 取出对象中的深层属性
function pluckDeep (path) {
  return obj => path.split('.').reduce((val, attr) => val[attr], obj)
}

// 将用户中的男性和女性分别放到不同的数组里
function partition (users) {
  const isMale = person => person.sex === 'male'
  return users.reduce(
    ([pass, fail], elem) => isMale(elem)
    ? [[...pass, elem], fail]
    : [pass, [...fail, elem]], [[], []]
  )
}

// 将 Stark 家族成员提取出来
const isStark = name => name.toLowerCase().includes('stark')
function takeWhile (f) {
  return ([head, ...tail]) => f(head)
    ? [head, ...takeWhile(f)(tail)]
    : []
}
takeWhile(isStark)(houses)

// 找出数组中的奇数，然后取出前4个
const isOdd = n => n % 2 === 1
function takeFirst (limit, f, arr) {
  if (limit === 0 || arr.length === 0) {
    return []
  }
  const [head, ...tail] = arr
  return f(head)
    ? [head, ...takeFirst(limit - 1, f, tail)]
    : takeFirst(limit, f, tail)
}
takeFirst(4, isOdd, numList)
