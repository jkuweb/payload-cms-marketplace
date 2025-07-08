'use client'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { MailIcon, PhoneCallIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

export const AgentContact = () => {
  return (
    <div className="bg-white rounded-lg p-6 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <Avatar className="size-12">
          <AvatarImage src="https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="text-lg font-semibold">Sarah Johnson</h4>
          <p className="text-sm text-muted-foreground">Licensed Real Estate Agent in Tennessee</p>
          <p className="text-muted-foreground text-xs">Licence #4533r</p>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <PhoneCallIcon size={16} />
            <a href="tel:+123456456">123-456-789</a>
          </div>
          <div className="flex items-center gap-2">
            <MailIcon size={16} />
            <a href={`mailto:sarah@example.com`}>sarah@example.com</a>
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
