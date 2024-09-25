import {NextApiRequest, NextApiResponse} from "next";
import {Converter, Schema} from "shared/lib/sql-to-mermaid";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send({
      detail: 'Method not allowed',
    })
    return
  }

  const body = req.body as string

  const converter = new Converter()

  let schema: Schema

  try {
    schema = await converter.parse(body, {
      database: 'Postgresql',
    })
  } catch (err) {
    console.error(err)

    res.status(400).send({
      detail: 'Invalid SQL',
    })
    return
  }

  const mermaid = converter.toMermaid(schema)

  res.status(200).send(mermaid)
}
