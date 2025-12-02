/* eslint-disable @typescript-eslint/no-explicit-any */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FaXTwitter } from 'react-icons/fa6'
import { RiGalleryLine } from 'react-icons/ri'

import { Member, TEAM } from './_mock/member'
import GalleryModal from './components/gallery'

gsap.registerPlugin(ScrollTrigger)

function groupRolesPreserveOrder(list: Member[]) {
  const roleOrder: string[] = []
  const map = new Map<string, Member[]>()

  for (const m of list) {
    for (const role of m.roles) {
      if (!map.has(role)) {
        map.set(role, [])
        roleOrder.push(role)
      }
      map.get(role)!.push(m)
    }
  }
  return roleOrder.map((r) => [r, map.get(r)!] as [string, Member[]])
}

export default function CreditsViewPage() {
  const containerRef = useRef<HTMLElement | null>(null)

  const [galleryMember, setGalleryMember] = useState<Member | null>(null)

  const groups = useMemo(() => {
    const raw = groupRolesPreserveOrder(TEAM)

    return raw.map(([role, members]) => {
      const sorted = [...members].sort((a, b) => {
        const sa = a.scores?.[role] ?? 0
        const sb = b.scores?.[role] ?? 0
        return sb - sa
      })
      return [role, sorted] as [string, Member[]]
    })
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.credits-hero', {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })

      gsap.utils.toArray<HTMLElement>('.credit-card').forEach((el) => {
        gsap.from(el, {
          y: 24,
          opacity: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <main
        ref={containerRef}
        className="min-h-screen px-6 py-10 text-white"
        style={{
          backgroundImage: "url('/assets/background/honey_pattern.png')",
        }}
      >
        <div className="mx-auto max-w-[1150px] rounded-xl bg-[#f5f5fa] px-6 py-10">
          <section className="credits-hero mx-auto mb-10 max-w-4xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Credits
            </h1>
            <p className="mt-3 text-sm text-slate-500 sm:text-base">
              ขอบคุณทีมงานทุกคนที่ร่วมกันสร้างโปรเจกต์นี้ขึ้นมา ด้วยความตั้งใจและความทุ่มเทอย่างสุดหัวใจ
            </p>
          </section>

          <div className="space-y-12">
            {groups.map(([role, members]) => {
              const scrollable = members.length > 6
              return (
                <section key={role}>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900">
                      {role}
                    </h2>
                    <p className="text-sm text-slate-500">
                      สมาชิก {members.length} คน
                    </p>
                  </div>

                  <div
                    className={`grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 ${
                      scrollable
                        ? 'custom-scroll max-h-[52vh] overflow-auto pr-3 md:max-h-[48vh]'
                        : ''
                    }`}
                  >
                    {members.map((m) => (
                      <article
                        key={`${m.id}-${role}`}
                        className="credit-card relative flex h-full min-h-[240px] transform-gpu flex-col items-center rounded-lg bg-[#2b2d31] p-6 text-center shadow-lg transition-transform duration-200"
                        aria-label={`${m.name} - ${role}`}
                      >
                        <div className="mb-4 h-24 w-24 flex-shrink-0 overflow-hidden rounded-full ring-1 ring-slate-700">
                          <img
                            src={m.avatar ?? '/assets/team/placeholder.png'}
                            alt={`${m.name} avatar`}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex flex-1 flex-col items-center">
                          <h3 className="text-lg font-semibold text-white">
                            {m.name}
                          </h3>
                          <p className="mb-2 text-sm text-pink-300/90">
                            {role}
                          </p>
                          <p className="text-xs text-slate-300/80">{m.bio}</p>
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                          {m.twitterUrl && (
                            <a
                              href={m.twitterUrl}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition hover:bg-white/10"
                              aria-label={`contact ${m.name}`}
                              target="_blank"
                            >
                              <FaXTwitter />
                            </a>
                          )}
                          {m.gallery?.length && (
                            <button
                              type="button"
                              onClick={() => setGalleryMember(m)}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition hover:bg-white/10"
                              aria-label={`more ${m.name}`}
                            >
                              <RiGalleryLine />
                            </button>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>

          <div className="mt-10 text-center text-sm text-slate-500">
            <p>
              ขอบคุณทุกคนที่มีส่วนร่วมในโปรเจกต์นี้ — พวกคุณรู้ดีว่าคือใคร ✨
            </p>
          </div>
        </div>
      </main>

      {galleryMember && (
        <GalleryModal
          member={galleryMember}
          onClose={() => setGalleryMember(null)}
        />
      )}
    </>
  )
}
