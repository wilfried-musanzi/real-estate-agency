import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { RoleId } from 'App/Types/types'
import Property from './Property'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public token: string

  @column()
  public isChecked: boolean

  @column()
  public username: string

  @column()
  public isOwner: boolean

  @hasMany(() => Property)
  public property: HasMany<typeof Property>

  @column({ serializeAs: null })
  public password: string

  @column()
  public roles: RoleId[]

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
