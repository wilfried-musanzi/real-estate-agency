export type RoleId = 'user' | 'admin'

export interface Role {
  id: RoleId
  label: string
}

export interface ContactType {
  name: string
  email: string
  message: string
}
