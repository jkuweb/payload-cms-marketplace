import { Button } from '@/components/ui/button'
import './globals.css'

export default async function HomePage() {
  return (
    <>
      <h1 className="text-4xl bg-amber-900">Hello World</h1>
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button>Button</Button>
      </div>
    </>
  )
}
