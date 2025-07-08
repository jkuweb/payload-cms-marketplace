'use client'
import { cn } from '@/lib/utils'
import { useProperty } from './context'
import { Property } from '@/payload-types'

export const PropertyStatus = ({ listingStatus }: { listingStatus: Property['listingStatus'] }) => {
  return (
    <div className={cn('text-sm font-medium uppercase text-white px-3 py-1 rounded-xs')}>
      {listingStatus}
    </div>
  )
}
