import { CollectionSlug } from 'payload'
import { Property } from '@/payload-types'
import { PropertyDecorator } from './property-decorator'
import { BaseRepository } from '../base-repository'

export class PropertyRepository extends BaseRepository<Property, PropertyDecorator> {
  override collection: CollectionSlug = 'properties'
  override DecoratorClass = PropertyDecorator
}
