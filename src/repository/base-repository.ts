import { notFound } from 'next/navigation'
import { CollectionSlug, PaginatedDocs, Where } from 'payload'
import { getPayloadClient } from '../db/client'

/**
 * Type helper to constrain relationship fields to their raw IDs only
 * This represents the document structure at depth 0 (no populated relationships)
 * Ensures populated objects are not passed where only ID references are expected
 * @template T - The document type
 */
export type DepthZeroFields<T> = {
  [K in keyof T]: T[K] extends { id: string | number }
    ? string | number // Convert populated objects to ID
    : T[K] extends Array<{ id: string | number }>
      ? Array<string | number> // Convert populated arrays to ID arrays
      : T[K] extends Array<infer U>
        ? U extends { id: string | number }
          ? Array<string | number> // Handle nested array types
          : T[K] // Keep as-is if not a relationship array
        : T[K] // Keep primitive types as-is
}

/**
 * Type for update data that only accepts depth-0 field values
 * @template T - The document type
 */
export type DataInput<T> = Partial<Omit<DepthZeroFields<T>, 'id' | 'updatedAt' | 'createdAt'>>

export abstract class BaseRepository<T, D> {
  abstract collection: CollectionSlug
  abstract DecoratorClass: new (data: T) => D

  async getBySlugOrFail(slug: string): Promise<D> {
    const doc = await this.getBySlug(slug)

    if (!doc) {
      notFound()
    }

    return doc
  }

  async getFirstOrFail(where: Where = {}) {
    const result = await this.getFirst(where)
    if (!result) {
      notFound()
    }

    return result
  }
  async getFirst(where: Where = {}): Promise<D | null> {
    const result = await this.getAll(where)
    if (result.length === 0) {
      return null
    }
    return result[0]
  }

  async getBySlug(slug: string): Promise<D | null> {
    const payload = await getPayloadClient()

    const result = (await payload.find({
      collection: this.collection,
      where: { slug: { equals: slug } },
      limit: 1,
    })) as PaginatedDocs<T>

    return this.createDecorator(result.docs[0]) ?? null
  }
  async getAll(where: Where = {}): Promise<D[]> {
    const payload = await getPayloadClient()

    const result = (await payload.find({
      collection: this.collection,
      where,
    })) as PaginatedDocs<T>

    return result.docs.map((d) => this.createDecorator(d)) ?? []
  }
  async getByID(id: number | string): Promise<D> {
    const payload = await getPayloadClient()

    const result = (await payload.find({
      collection: this.collection,
      where: { id: { equals: id } },
    })) as PaginatedDocs<T>

    if (result.totalDocs === 0) {
      notFound()
    }

    return this.createDecorator(result.docs[0]) //
  }

  /**
   * Finds an existing document or creates a new one
   * @param data - The document data to create if not found
   * @param field - The field to search by
   * @returns Promise resolving to existing or newly created document
   */
  findOrCreate = async (data: DataInput<T>, field: keyof DataInput<T>) => {
    const results = await this.getAll({ [field]: { equals: data[field] } })

    if (results.length > 0) {
      return results[0] //
    } else {
      return await this.create(data as DataInput<T>)
    }
  }

  async create(data: DataInput<T>) {
    const payload = await getPayloadClient()
    const createdData = (await payload.create({
      collection: this.collection,
      data,
    })) as T

    return this.createDecorator(createdData) //
  }
  async update(id: string | number, data: Omit<Partial<T>, 'id' | 'createdAt' | 'updatedAt'>) {
    const payload = await getPayloadClient()
    await payload.update({
      collection: this.collection,
      id,
      data,
    })
  }
  async delete(id: string | number) {
    const payload = await getPayloadClient()
    await payload.delete({
      collection: this.collection,
      id,
    })
  }

  protected createDecorator(data: T): D {
    return new this.DecoratorClass(data)
  }
}
