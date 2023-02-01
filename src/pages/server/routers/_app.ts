import { z } from "zod"
import { procedure, router } from "../trpc"

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `${input.text} Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.`,
      }
    }),
})

// export type definition of API
export type AppRouter = typeof appRouter
