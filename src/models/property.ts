import { formatPrice } from '@/lib/format-price'
import route from '@/lib/routes'
import {
  Feature,
  Property as PropertyType,
  Location as LocationType,
  Media,
  Agent,
} from '@/payload-types'
import slugify from 'slugify'

export type DecoratedPhoto = {
  id: number
  url: string | null
  alt: string
}

export class Property {
  constructor(readonly data: PropertyType) {}

  get id(): string {
    return this.data.id
  }

  get title(): string {
    return this.data.title
  }

  get listingStatus(): PropertyType['listingStatus'] {
    return this.data.listingStatus
  }

  get price(): string {
    return formatPrice(this.data.price)
  }

  get address(): PropertyType['address'] {
    return this.data.address
  }
  get details() {
    return {
      bedrooms: this.data.details?.bedrooms ?? 0,
      bathrooms: this.data.details?.bathrooms ?? 0,
      squareFeet: this.data.details?.squareFeet?.toLocaleString() ?? '0',
      lotSize: this.data.details?.lotSize?.toLocaleString() ?? '0',
      yearBuilt: this.data.details?.yearBuilt ?? 0,
      propertyType: this.data.details?.propertyType,
      heatingType: this.data.details?.heatingType,
    }
  }

  get features(): Feature[] {
    if (!this.data.features) return []
    const features = this.data.features as Feature[]
    return features
  }

  get url(): string {
    const location = this.data.location as LocationType
    const fullAddress = [this.data.street, location.city, location.state_abbr, location.zip].map(
      (l) => slugify(`${l}`, { lower: true }),
    )
    console.log({ fullAddress })
    return route('property.show', {
      id: this.data.id,
      full_address: fullAddress.join('/'),
    })
  }
  get description(): string {
    return this.data.description ?? ''
  }

  get photos(): DecoratedPhoto[] {
    const photos = (this.data.photos ?? []) as Media[]
    const decoratedPhotos = photos
      .filter((p) => !!p.url)
      .map((photo) => {
        return {
          id: photo.id,
          url: photo.url!,
          alt: photo.alt,
        }
      })

    return decoratedPhotos
  }

  get agent(): Agent {
    return this.data.agent as Agent
  }
}
