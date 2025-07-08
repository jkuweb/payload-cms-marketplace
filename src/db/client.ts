import { getPayload } from 'payload'
import config from '@/payload.config'

export const getPlayloadClient = async () => {
  const client = await getPayload({ config })
  return client
}
