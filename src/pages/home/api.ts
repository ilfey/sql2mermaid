import {createMutation} from "@farfetched/core";

export const convertQuery = createMutation<string, string>({
  handler: async (body) => {
    const req = await fetch("/api/convert", {
      method: "POST",
      body
    })

    return await req.text()
  }
})
