'use server'

import { actionClient } from '@/lib/safe-action'
import { schema } from './schema'
import { success } from 'zod'

export const propertyInquiryAction = actionClient.inputSchema(schema).action(async (args) => {
  const { parsedInput } = args

  console.log({ parsedInput })
  return { success: 'Mensaje enviado correctamente' }
})
