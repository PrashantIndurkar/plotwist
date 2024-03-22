import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  shared: {
    VERCEL_URL: z
      .string()
      .optional()
      .transform((v) => (v ? `https://${v}` : undefined)),
    PORT: z.coerce.number().default(3000),
    RESEND_API_KEY: z.string(),
    LOOPS_ENDPOINT: z.string(),
    LOOPS_API_KEY: z.string(),
    GOCARDLESS_SECRET_ID: z.string(),
    GOCARDLESS_SECRET_KEY: z.string(),
    NOVU_API_KEY: z.string(),
    UPSTASH_REDIS_REST_URL: z.string(),
    UPSTASH_REDIS_REST_TOKEN: z.string(),
    SUPABASE_SERVICE_KEY: z.string(),
    OPENAI_API_KEY: z.string(),
    API_ROUTE_SECRET: z.string(),
    NOTION_TOKEN: z.string(),
    NOTION_DATABASE_ID: z.string(),
  },
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app isn't
   * built with invalid env vars.
   */
  server: {},
  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    NEXT_PUBLIC_NOVU_APPLICATION_IDENTIFIER: z.string(),
    NEXT_PUBLIC_SUPABASE_ID: z.string(),
    NEXT_PUBLIC_TRIGGER_API_KEY: z.string(),
    NEXT_PUBLIC_LOGSNAG_TOKEN: z.string(),
    NEXT_PUBLIC_LOGSNAG_PROJECT: z.string(),
    NEXT_PUBLIC_TELLER_APPLICATION_ID: z.string(),
    NEXT_PUBLIC_TELLER_ENVIRONMENT: z.string(),
    NEXT_PUBLIC_PLAID_ENVIRONMENT: z.string(),
    NEXT_PUBLIC_LOGSNAG_DISABLED: z.boolean().optional(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  runtimeEnv: {
    VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_ID: process.env.NEXT_PUBLIC_SUPABASE_ID,
    NEXT_PUBLIC_TELLER_APPLICATION_ID:
      process.env.NEXT_PUBLIC_TELLER_APPLICATION_ID,
    NEXT_PUBLIC_TELLER_ENVIRONMENT: process.env.NEXT_PUBLIC_TELLER_ENVIRONMENT,
    NEXT_PUBLIC_PLAID_ENVIRONMENT: process.env.NEXT_PUBLIC_PLAID_ENVIRONMENT,
    NEXT_PUBLIC_LOGSNAG_DISABLED: process.env.NEXT_PUBLIC_LOGSNAG_DISABLED,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    PORT: process.env.PORT,
    LOOPS_ENDPOINT: process.env.LOOPS_ENDPOINT,
    LOOPS_API_KEY: process.env.LOOPS_API_KEY,
    GOCARDLESS_SECRET_ID: process.env.GOCARDLESS_SECRET_ID,
    GOCARDLESS_SECRET_KEY: process.env.GOCARDLESS_SECRET_KEY,
    NOVU_API_KEY: process.env.NOVU_API_KEY,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    NEXT_PUBLIC_NOVU_APPLICATION_IDENTIFIER:
      process.env.NEXT_PUBLIC_NOVU_APPLICATION_IDENTIFIER,
    NEXT_PUBLIC_TRIGGER_API_KEY: process.env.NEXT_PUBLIC_TRIGGER_API_KEY,
    NEXT_PUBLIC_LOGSNAG_TOKEN: process.env.NEXT_PUBLIC_LOGSNAG_TOKEN,
    NEXT_PUBLIC_LOGSNAG_PROJECT: process.env.NEXT_PUBLIC_LOGSNAG_PROJECT,
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    API_ROUTE_SECRET: process.env.API_ROUTE_SECRET,
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
})
