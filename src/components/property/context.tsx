'use client'

import { createContext, useContext } from 'react'
import { Property as PropertyType } from '@/payload-types'
import { Property } from '@/models/property'

export const PropertyContext = createContext<PropertyType | null>(null)

interface PropertyProviderProps {
  children: React.ReactNode
  payload: PropertyType
}

export const PropertyProvider = (data: PropertyProviderProps) => {
  const { children, payload } = data
  return <PropertyContext.Provider value={payload}>{children}</PropertyContext.Provider>
}

export const useProperty = () => {
  const context = useContext(PropertyContext)
  if (!context) throw new Error('useProperty must used within a PropertyProvider')
  const property = new Property(context)
}
