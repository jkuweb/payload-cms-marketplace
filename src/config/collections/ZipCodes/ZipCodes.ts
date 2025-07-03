import { CollectionConfig } from 'payload'

export const ZipCodes: CollectionConfig = {
  slug: 'zipcodes',
  admin: {
    useAsTitle: 'code',
  },
  fields: [
    {
      name: 'code',
      label: 'Código Zip',
      type: 'text',
      unique: true,
      admin: {
        placeholder: 'Introduce el Código Zip',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'city',
          label: 'Cuidad',
          type: 'text',
          admin: {
            placeholder: 'Ciudad',
          },
        },
        {
          name: 'state_abbr',
          label: 'Abrev.',
          type: 'text',
          admin: {
            placeholder: 'Abreviatura del nombre del estado',
          },
        },
        {
          name: 'state_name',
          label: 'Estado',
          type: 'text',
          admin: {
            placeholder: 'Nombre del estado',
          },
        },
        {
          name: 'country',
          label: 'País',
          type: 'text',
          admin: {
            placeholder: 'Nombre del país',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'latitude',
          label: 'Latitud',
          type: 'number',
          admin: {
            placeholder: 'Introduce la latidud',
          },
        },
        {
          name: 'longitude',
          label: 'longitud',
          type: 'number',
          admin: {
            placeholder: 'Introduce la longitud',
          },
        },
      ],
    },
    {
      name: 'est_population',
      label: 'Poblaación estimada',
      type: 'number',
      admin: {
        placeholder: 'Introduce la problación estimada',
      },
    },
  ],
}
