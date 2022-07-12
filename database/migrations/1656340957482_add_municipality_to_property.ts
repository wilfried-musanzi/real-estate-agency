import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'properties'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('municipality_id')
        .unsigned()
        .references('municipalities.id')
        .onDelete('SET NULL')
        .nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('municipality_id')
    })
  }
}
