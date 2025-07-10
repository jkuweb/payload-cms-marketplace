import { CollectionConfig } from 'payload'

export const Agents: CollectionConfig = {
  slug: 'agents',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['profilePhoto', 'fullName', 'contact_email', 'phone'],
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
      // hooks: {
      //   afterRead: [
      //     ({ data }) => {
      //       if (!data) return null
      //       const firstName = capitalizeFirstLetter(data.firstName)
      //       return firstName
      //     },
      //   ],
      // },
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      // hooks: {
      //   afterRead: [
      //     ({ data }) => {
      //       if (!data) return null
      //       const lastName = capitalizeFirstLetter(data.lastName)
      //       return lastName
      //     },
      //   ],
      // },
    },
    {
      name: 'fullName',
      label: 'Nombre completo',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            if (!data) return null
            return `${data.firstName} ${data.lastName}`
          },
        ],
      },
    },
    {
      name: 'initials',
      type: 'text',
      virtual: true,
      admin: {
        hidden: true,
      },
      hooks: {
        afterChange: [
          ({ data }) => {
            if (!data) return null
            return `${data.firstName.charAt(0).toUpperCase()}${data.lastName.charAt(0).toUpperCase()}`
          },
        ],
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'e.g., "Realtor", "Senior Agent", "Broker"',
      },
    },
    {
      name: 'profilePhoto',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'contact_email',
      type: 'email',
      label: 'Email de contacto',
    },
  ],
}
