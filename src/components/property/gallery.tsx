'use client'

import { Media } from '@/payload-types'
import { useProperty } from '../../providers/property'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import Image from 'next/image'
import { DialogTitle } from '@radix-ui/react-dialog'

export const PropertyGallery = () => {
  const property = useProperty()

  const images = property.photos as Media[]

  // Feature image is the first one
  const featureImage = images[0]
  // Grid images are all remaining images (index 1 and beyond)
  const gridImages = images.slice(1, 7)
  return (
    <Dialog>
      <div className="relative">
        {/* Main gallery with CSS Grid that changes based on screen size */}
        <div className="grid grid-cols-12 grid-rows-1 gap-1  max-h-[520px] 2xl:max-h-[680px]">
          {/* Feature image - always visible */}
          {featureImage?.url && (
            <DialogTrigger key={featureImage.url} asChild>
              <Image
                src={featureImage.url}
                alt={featureImage.alt}
                width={800}
                height={600}
                className="w-full col-span-12 h-full md:col-span-8 lg:col-span-6 object-cover cursor-pointer"
              />
            </DialogTrigger>
          )}

          {/* Secondary images - visible based on screen size */}
          <div className=" hidden h-full grid-cols-1 md:grid md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 md:grid-rows-2 md:col-span-4 lg:col-span-6 gap-1">
            {gridImages.map((image, index) => {
              // Determine visibility based on screen size and image position
              let visibilityClass = ''

              if (index < 2) {
                // First two images visible on tablet and up
                visibilityClass = ''
              } else if (index < 4) {
                // Next two images visible on desktop and up
                visibilityClass = 'hidden lg:block'
              } else {
                // Last two images visible only on 2xl screens
                visibilityClass = 'hidden 2xl:block'
              }

              if (!image.url) return null

              return (
                <DialogTrigger key={image.id} asChild>
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className={`w-full h-full object-cover cursor-pointer photo-${image.id} ${visibilityClass}`}
                  />
                </DialogTrigger>
              )
            })}
            <DialogTitle />
          </div>
        </div>
      </div>
      <DialogContent className="h-screen w-full overflow-hidden max-w-full sm:max-w-full bg-transparent border-none shadow-none rounded-none">
        <div className="absolute inset-0 h-full w-full sm:p-6">
          <div className="bg-background sm:rounded-lg h-full w-full overflow-y-scroll p-4">
            <div className="mx-auto max-w-7xl">
              {images.map((image) => {
                return (
                  <Image
                    key={image.url!}
                    src={image.url!}
                    alt={image.alt ?? ''}
                    className="w-full h-full object-cover"
                    width={800}
                    height={600}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
