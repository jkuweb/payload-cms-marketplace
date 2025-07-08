import { getPlayloadClient } from '@/db/client'
import { notFound } from 'next/navigation'

interface Props {
  routePath: string
}

export default async function PropertyDetailPage(params: Props) {
  const { routePath } = await params
  const id = routePath[routePath.length - 1]
  const payload = await getPlayloadClient()
  const data = await payload.findByID({
    collection: 'properties',
    id,
  })
  if (!data) return notFound()
  return (
    <>
      <h1>Property Detail Page</h1>
      <div>{JSON.stringify(routePath, null, 2)}</div>
    </>
  )
}
