'use client'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { MailIcon, PhoneCallIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useProperty } from './context'
import { Media } from '@/payload-types'

export const AgentContact = () => {
  const property = useProperty()
  const agent = property.agent
  const profilePhoto = agent.profilePhoto as Media

  return (
    <div className="bg-white rounded-lg p-6 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <Avatar className="size-12">
          <AvatarImage src={profilePhoto.url!} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="text-lg font-semibold">{agent.fullName}</h4>
          <p className="text-sm text-muted-foreground">Licensed Real Estate Agent in Tennessee</p>
          <p className="text-muted-foreground text-xs">Licence #4533r</p>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <PhoneCallIcon size={16} />
            <a href={`tel:${agent.phone}`}>{agent.phone}</a>
          </div>
          <div className="flex items-center gap-2">
            <MailIcon size={16} />
            <a href={`mailto:${agent.contact_email}`}>{agent.contact_email}</a>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Input placeholder="Enter your name" />
        <Input placeholder="Enter your email" />
        <Textarea placeholder="Enter your message" />

        <Button className="w-full" size={'lg'}>
          Send
        </Button>
      </div>
    </div>
  )
}
