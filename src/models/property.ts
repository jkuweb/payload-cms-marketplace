import { formatPrice } from '@/lib/format-price'
import route from '@/lib/routes'
import { Feature, Property as PropertyType, Location as LocationType } from '@/payload-types'
import slugify from 'slugify'

export class Property {
  constructor(readonly data: PropertyType) {}

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
}
