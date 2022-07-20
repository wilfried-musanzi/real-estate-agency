export type RoleId = 'user' | 'admin'

export interface Role {
  id: RoleId
  label: string
}
