export type Schema = {
  tables: Tables
  relations: Relations
}

export type Column = {
  type: string
  constraints: Constraint[]
}

export enum Constraint {
  UNIQUE = 'unique',
  NOT_NULL = 'not_null',
  PRIMARY_KEY = 'primary_key',
  FOREIGN_KEY = 'foreign_key',
}

export type TableName = string

export type ColumnName = string

export type Columns = Record<ColumnName, Column>

export type Tables = Record<TableName, Table>

export type Table = {
  columns: Columns
}

export type Relations = Record<TableName, Array<Relation>>

export type Relation = {
  related: TableName
  columnPrimaryKey: string
  columnForeignKey: string
}
