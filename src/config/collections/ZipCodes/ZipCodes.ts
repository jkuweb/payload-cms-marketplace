import { CollectionConfig } from 'payload'

export const ZipCodes: CollectionConfig = {
  slug: 'zipcodes',
  labels: {
    singular: 'Zip Code',
    plural: 'Zip Codes',
  },
  admin: {
    useAsTitle: 'code',
  },
  fields: [
    {
      name: 'code',
      type: 'number',
      unique: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'state_abbr',
          type: 'text',
        },
        {
          name: 'state_name',
          type: 'text',
        },
        {
          name: 'country',
          type: 'text',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'latitude',
          type: 'number',
        },
        {
          name: 'longitude',
          type: 'number',
        },
      ],
    },
    {
      name: 'est_population',
      type: 'number',
      label: 'Estimated population',
      admin: {
        description: 'Estimated population of the zip code',
      },
    },
  ],
}
