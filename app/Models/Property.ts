import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Municipality from './Municipality'

export default class Property extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string | null

  @column()
  public description: string | null

  @column()
  public price: number

  @column()
  public surface: number

  @column()
  public thumb: string | null

  @column()
  public reserved: boolean

  @belongsTo(() => Municipality)
  public municipality: BelongsTo<typeof Municipality>

  @column()
  public municipalityId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
