// 校验用户权限
export function checkRights(key) {
  const rights = ['a1', 'b', 'c']
  const index = rights.indexOf(key)
  return index > -1
}
