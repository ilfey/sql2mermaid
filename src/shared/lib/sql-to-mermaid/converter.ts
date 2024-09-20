import {AST, Option, Parser} from "node-sql-parser";
import {Column, Constraint, Relation, Relations, Schema, Table, Tables} from "./types";

export class Converter {
  private sqlParser: Parser
  private tables: Tables
  private relations: Relations = {}

  public constructor() {
    this.sqlParser = new Parser();
    this.tables = {}
  }

  public parse(src: string, opt?: Option): Promise<Schema> {
    return new Promise(resolve => {
      const ast = this.sqlParser.astify(src, opt);

      this.run(ast)

      resolve({
        tables: this.tables,
        relations: this.relations
      })
    })
  }

  public parseSync(src: string, opt?: Option): Schema {
    const ast = this.sqlParser.astify(src, opt);

    this.run(ast)

    return {
      tables: this.tables,
      relations: this.relations
    }
  }

  public toMermaid(schema: Schema = {tables: this.tables, relations: this.relations}): string {
    let source = "erDiagram\n"

    // Convert tables.
    for (const [tableName, table] of Object.entries(schema.tables)) {
      source += "\t" + tableName + "{\n"

      for (const [columnName, column] of Object.entries(table.columns)) {
        source += "\t\t" + columnName + " " + column.type + " " + Converter.formatConstraints(column) + "\n"
      }

      source += "\t}\n"
    }

    // Convert relations.
    for (const [tableName, relations] of Object.entries(schema.relations)) {
      for (const relation of relations) {
        const columnFk = schema.tables[tableName].columns[relation.columnForeignKey]
        const columnPk = schema.tables[relation.related].columns[relation.columnPrimaryKey]

        source += "\t" + tableName + " " + Converter.oneOrMany("left", columnFk) + Converter.zeroOrOne(columnFk) +
          "--" +
          Converter.zeroOrOne(columnPk) + Converter.oneOrMany("right", columnPk) + " " + relation.related + " : \"\"\n"
      }
    }

    return source
  }

  protected run(ast: AST | AST[]) {
    if (!Array.isArray(ast)) {
      ast = [ast]
    }

    for (const node of ast) {

      if (node.type !== 'create' || node.keyword !== "table") {
        continue
      }

      if (!node.table) {
        continue
      }

      const tableName = node.table[0].table

      const table = {
        columns: {},
      } as Table

      // eslint-disable-next-line
      for (const createDef of node.create_definitions as any[]) {
        if (createDef?.column) {
          if (!createDef.column?.column) {
            continue
          }

          const columnName: string = createDef.column.column
          const type: string = createDef.definition.dataType
          const constraints: Constraint[] = []

          if (createDef.primary_key) {
            constraints.push(Constraint.PRIMARY_KEY, Constraint.UNIQUE)
          }

          if (createDef.nullable?.type === 'not null') {
            constraints.push(Constraint.NOT_NULL)
          }

          table.columns[columnName] = {
            type,
            constraints,
          }

          this.tables[tableName] = table

        } else if (createDef.constraint_type === 'primary key') {
          for (const def of createDef.definition) {
            table.columns[def.column].constraints.push(Constraint.PRIMARY_KEY)
          }
        } else if (createDef.constraint_type === 'foreign key') {
          const relation = {} as Relation

          for (const def of createDef.definition) {
            relation.columnForeignKey = def.column
            table.columns[def.column].constraints.push(Constraint.FOREIGN_KEY)
          }

          for (const table of createDef.reference_definition.table) {
            relation.related = table.table
          }

          for (const def of createDef.reference_definition.definition) {
            relation.columnPrimaryKey = def.column
          }

          if (!this.relations[tableName]) {
            this.relations[tableName] = [relation]
          } else {
            this.relations[tableName].push(relation)
          }
        }
      }
    }
  }

  protected static formatConstraints(column: Column) {
    if (column.constraints.includes(Constraint.PRIMARY_KEY)) {
      if (column.constraints.includes(Constraint.FOREIGN_KEY)) {
        return "PK, FK"
      }

      return "PK"
    } else {
      if (column.constraints.includes(Constraint.FOREIGN_KEY)) {
        return "FK"
      }

      return ""
    }
  }

  protected static zeroOrOne(column: Column) {
    if (
      column.constraints.includes(Constraint.NOT_NULL) ||
      column.constraints.includes(Constraint.PRIMARY_KEY) &&
      !column.constraints.includes(Constraint.FOREIGN_KEY)
    ) {
      return "|"
    }

    return "o"
  }

  protected static oneOrMany(side: "left" | "right", column: Column) {
    if (column.constraints.includes(Constraint.UNIQUE)) {
      return "|"
    }

    return side == "left" ? "}" : "{"
  }
}
