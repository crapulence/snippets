import { cloneDeep } from 'lodash-es'

interface TreeItem<T> extends Object {
  children?: T[]
}

/**
 * 在一个树状结构中，摘取其中的几个字段，然后返回这棵树
 * @param list
 * @param keys
 */
export function cherryPick<T extends TreeItem<T>, K extends keyof T>(list: T[], ...keys: K[]): Pick<T, K>[] {
  const result: T[] = []
  for (const item of list) {
    const newItem: any = {}
    for (const key in item) {
      // @ts-expect-error ignore error
      if (item.hasOwnProperty(key) && keys.includes(key)) {
        newItem[key] = item[key]
      }
    }

    result.push(newItem)

    if (item.children?.length) {
      newItem.children = cherryPick(item.children, ...keys)
    }
  }

  return result
}

/**
 * 遍历一个树节点
 * @param list
 * @param cb
 */
export function walk<T extends TreeItem<T>>(list: T[], cb: (child: T, parent?: T) => unknown, parent?: T): void {
  for (const item of list) {
    cb(item, parent)
    if (item.children?.length) {
      walk(item.children, cb, item)
    }
  }
}

/**
 * 重新制作一颗树节点，既 A 树转换成 B 树
 * @param list
 * @param cb
 */
export function remake<T extends TreeItem<T>, N>(list: T[], cb: (child: T, parent?: T) => N, parent?: T) {
  let index = 0
  for (const item of list) {
    const newItem = cb(cloneDeep(item), parent)
    // @ts-expect-error ignore
    list[index] = newItem
    if (item.children?.length) {
      walk(item.children, cb, item)
    }
    index++
  }

  // @ts-expect-error ignore
  return list as N[]
}
