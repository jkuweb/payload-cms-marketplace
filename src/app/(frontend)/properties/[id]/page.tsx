import { getPayload } from 'payload'
import config from '@payload-config'
import { Zipcode } from '@/payload-types'
import { PropertyWithAddress } from '@/config/collections/Properties/Properties'

interface PageProps {
  params: {
    id: string
  }
}

export default async function PropertiesPage({ params }: PageProps) {
  const { id } = await params
  const payload = await getPayload({ config })
  const property = (await payload.findByID({
    collection: 'properties',
    id: id,
  })) as PropertyWithAddress

  const zipcode = property.zipcode as Zipcode
  return (
    <>
      <div>
        <h1 className="text-xl font-bold">{property.title}</h1>
        <p>{property.address.street}</p>
        <p>{property.address.city}</p>
        <p>{property.address.state_abbr}</p>
        <p>{property.address.zip}</p>
      </div>
      <div>
        <pre>{JSON.stringify(property, null, 2)}</pre>
      </div>
    </>
  )
}
