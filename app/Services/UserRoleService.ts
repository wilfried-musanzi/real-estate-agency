import User from 'App/Models/User'
import { RoleId } from 'App/Types/types'

export function userHasRoles(roles: RoleId[], user: User) {
  if (user.roles.includes('admin')) {
    return true
  }
  for (const role of roles) {
    if (user.roles.includes(role)) {
      return true
    }
  }
  return false
}
