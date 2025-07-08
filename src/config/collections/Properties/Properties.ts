import type { CollectionConfig, PayloadRequest } from 'payload'
import { AfterReadHook } from 'node_modules/payload/dist/collections/config/types'
import type { JSONSchema4 } from 'json-schema'
import { generatePrimaryKey } from '@/lib/generate-primary-key'
import slugify from 'slugify'
import routes from '@/lib/routes'
import type { Location } from '@/payload-types'

const formatAddress: AfterReadHook = async ({ doc }) => {
  console.log({ location: doc.location })

  return {
    ...doc,
    address: {
      street: doc.street,
      city: doc.location.city,
      state: doc.location.state_name,
      state_abbr: doc.location.state_abbr,
      zip: doc.location.zip,
      full_address: `${doc.street}, ${doc.location.city}, ${doc.location.state_abbr} ${doc.location.zip}`,
    },
  }
}

const generateUrl = async (id: string, req: PayloadRequest) => {
  console.log('generating url', req)
  const property = await req.payload.findByID({ collection: 'properties', id })
  const location = property.location as Location
  const fullAddress = [property.street, location.city, location.state_abbr, location.zip].map((l) =>
    slugify(`${l}`, { lower: true }),
  )
  return (
    req.payload.config.serverURL +
    routes('property.show', {
      id,
      full_address: fullAddress.join('/'),
    })
  )
}

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title',
    preview: (doc, options) => generateUrl(String(doc.id), options.req as PayloadRequest),
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      admin: {
        hidden: true,
      },
      defaultValue: () => generatePrimaryKey(8),
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'street',
      type: 'text',
      required: true,
      label: 'Street Address',
    },
    {
      name: 'address',
      type: 'text',
      admin: {
        hidden: true,
      },
      typescriptSchema: [
        () => {
          const address: JSONSchema4 = {
            type: 'object',
            properties: {
              street: { type: 'string' },
              city: { type: 'string' },
              state: { type: 'string' },
              state_abbr: { type: 'string' },
              zip: { type: 'string' },
              full_address: {
                type: 'string',
              },
            },
            required: ['street', 'city', 'state', 'state_abbr', 'zip', 'full_address'],
          }

          return address
        },
      ],
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      required: true,
      hasMany: false,
      admin: {
        description: 'Select a ZIP code for this property.',
      },
    },
    {
      name: 'photos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'listingStatus',
      type: 'select',
      required: true,
      options: [
        {
          label: 'For Sale',
          value: 'forsale',
        },
        {
          label: 'Offer Pending',
          value: 'pending',
        },
        {
          label: 'Under Contract',
          value: 'contract',
        },
        {
          label: 'Sold',
          value: 'sold',
        },
        {
          label: 'Not For Sale',
          value: 'notforsale',
        },
      ],
    },
    {
      name: 'details',
      type: 'group',
      fields: [
        {
          name: 'bedrooms',
          type: 'number',
        },
        {
          name: 'bathrooms',
          type: 'number',
        },
        {
          name: 'squareFeet',
          type: 'number',
        },
        {
          name: 'lotSize',
          type: 'number',
        },
        {
          name: 'yearBuilt',
          type: 'number',
        },
      ],
    },
    {
      name: 'features',
      type: 'relationship',
      relationTo: 'features',
      hasMany: true,
    },
  ],
  hooks: {
    afterRead: [formatAddress],
  },
}
