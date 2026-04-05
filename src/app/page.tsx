'use client'

import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { FloatCTA } from '@/components/layout/FloatCTA'
import { Hero } from '@/components/sections/Hero'
import { TrustBar } from '@/components/sections/TrustBar'
import { Charter } from '@/components/sections/Charter'
import { Fleet } from '@/components/sections/Fleet'
import { Destinations } from '@/components/sections/Destinations'
import { Management } from '@/components/sections/Management'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Nav />
      <FloatCTA />
      <main>
        <Hero />
        <TrustBar />
        <Charter />
        <Fleet />
        <Destinations />
        <div id="about" style={{ height: '1px' }} />
        <Management />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
