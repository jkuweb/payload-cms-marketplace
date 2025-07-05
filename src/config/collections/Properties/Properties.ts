import { Property, Zipcode } from '@/payload-types'
import { CollectionConfig } from 'payload'

export interface PropertyWithAddress extends Property {
  address: {
    street: string
    city: string
    state_abbr: string
    state_name: string
    zip: string
  }
}

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
    },
    {
      name: 'street',
      label: 'Calle',
      required: true,
      type: 'text',
    },
    {
      name: 'zipcode',
      label: 'Código Postal',
      required: true,
      type: 'relationship',
      relationTo: 'zipcodes',
      admin: {
        description: 'Elegir el código postal',
      },
    },
    {
      name: 'price',
      label: 'Precio',
      type: 'number',
      required: true,
    },
    {
      name: 'listingStatus',
      label: 'Estado',
      required: true,
      type: 'select',
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
          value: 'notsale',
        },
      ],
    },
  ],
  hooks: {
    afterRead: [
      async ({ doc }) => {
        const zipcode = doc.zipcode as Zipcode
        const address = {
          street: doc.street,
          city: zipcode.city,
          state_abbr: zipcode.state_abbr,
          state_name: zipcode.state_name,
          zip: zipcode.code,
        }
        doc.address = address
        const docWithAddress = {
          ...doc,
          address,
          zipcode: undefined,
          street: undefined,
        } as PropertyWithAddress

        return docWithAddress
      },
    ],
  },
}
