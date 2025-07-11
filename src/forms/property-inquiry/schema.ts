import z from 'zod'

export const schema = z.object({
  propertyId: z.string(),
  agentId: z.number(),
  email: z.email({ error: 'Email Invalido' }),
  phone: z.string().optional(),
  name: z
    .string()
    .min(3, { error: 'El nombre debe de tener al menos 3 caracteres' })
    .max(1000, { error: 'Longitud excedida' }),
  message: z
    .string()
    .min(1, { error: 'Por favor, incluya un mensaje' })
    .max(256, { error: 'Longitud del mensaje excedido' }),
})

export type PropertyInquirySchema = z.infer<typeof schema>
