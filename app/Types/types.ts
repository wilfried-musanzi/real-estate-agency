export type RoleId = 'user' | 'admin'

export interface Role {
  id: RoleId
  label: string
}

export interface Contact {
  name: string
  email: string
  message: string
}
