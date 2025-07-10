import { AgentContact } from '@/components/property/agent-contact'
import { PropertyProvider } from '@/components/property/context'
import { PropertyDetails } from '@/components/property/details'
import { PropertyFeatures } from '@/components/property/features'
import { PropertyGallery } from '@/components/property/gallery'
import { PropertyMap } from '@/components/property/map'
import { PropertyOverview } from '@/components/property/overview'
import { getPlayloadClient } from '@/db/client'
import { notFound, redirect } from 'next/navigation'
import { Property as PropertyType } from '@/payload-types'
import { PropertyInquiry } from '@/components/property/inquiry'

// export async function generateMetadata({ params }: { params: Promise<{ routePath: string[] }> }) {
//   const { routePath } = await params
//   const propertyId = routePath[routePath.length - 1]
//   const property = await model.property.find(propertyId)
//   if (!property) {
//     return {
//       title: 'Property Not Found',
//       description: 'The requested property could not be found.',
//     }
//   }
//   return {
//     metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
//     alternates: {
//       canonical: property.url,
//     },
//     title: property.get('address').full_address,
//     description: property.get('description'),
//   }
// }

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ routePath: string[] }>
}) {
  const { routePath } = await params
  const propertyId = routePath[routePath.length - 1]
  const payload = await getPlayloadClient()
  const property = await payload.findByID({
    collection: 'properties',
    id: propertyId,
  })

  if (!property) return notFound()

  return (
    <PropertyProvider property={property}>
      <div className="w-full flex flex-col bg-gray-200">
        <PropertyGallery />
        <div className="max-w-7xl p-4  w-full mx-auto grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8 grid gap-4">
            <PropertyDetails />
            <PropertyOverview />
            <PropertyFeatures />
            <PropertyMap />
          </div>

          <div className="col-start-3 col-span-8 md:col-span-4">
            <div className="sticky top-4">
              <PropertyInquiry />
            </div>
          </div>
        </div>
      </div>
    </PropertyProvider>
  )
}
