/**
 * @param {Array} targetarr
 * @param {Array} arr
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => targetarr.some(_ => arr.includes(_))
