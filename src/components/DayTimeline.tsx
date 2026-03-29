'use client'

import { useState } from 'react'
import type { DayItem } from '../types/plan'

interface Props {
  days: DayItem[]
}

function formatDate(dateStr: string, dow: string) {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return `${d.getMonth()+1}/${d.getDate()}  ${dow}`
}

const mealMeta = {
  breakfast: { jp: '朝食', en: 'BREAKFAST' },
  lunch:     { jp: '昼食', en: 'LUNCH' },
  dinner:    { jp: '夕食', en: 'DINNER' },
} as const

export default function DayTimeline({ days }: Props) {
  const [expanded, setExpanded] = useState<number | null>(0)
  if (!days?.length) return null

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      {/* Section header */}
      <div className="flex items-baseline gap-4 mb-7">
        <h2 className="font-serif text-2xl text-[#f0ebe3]">逐日行程</h2>
        <div className="flex-1 h-px bg-[#2a2720]" />
        <span className="text-[9px] tracking-[0.4em] text-[#4a4540] uppercase">Itinerary</span>
      </div>

      <div className="space-y-0 border-t border-[#2a2720]">
        {days.map((day, i) => {
          const isOpen = expanded === i
          return (
            <div key={i} style={{ borderBottom: '1px solid #2a2720' }}>
              {/* Header row */}
              <button
                className="w-full flex items-center gap-6 py-5 px-2 text-left group hover:bg-[#141210] transition-colors"
                onClick={() => setExpanded(isOpen ? null : i)}
              >
                {/* Day number */}
                <div className="flex-shrink-0 w-12 text-right">
                  <span
                    className="font-serif text-3xl tabular-nums leading-none"
                    style={{ color: isOpen ? '#c9a96e' : '#3a3830' }}
                  >
                    {String(day.dayNumber).padStart(2, '0')}
                  </span>
                </div>

                {/* Vertical divider */}
                <div
                  className="flex-shrink-0 w-px h-8 self-center"
                  style={{ background: isOpen ? '#c9a96e' : '#2a2720' }}
                />

                {/* Date + route */}
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] tracking-[0.35em] text-[#4a4540] uppercase mb-1.5">
                    {formatDate(day.date, day.dayOfWeek)}
                  </div>
                  <div
                    className="text-sm font-medium truncate transition-colors"
                    style={{ color: isOpen ? '#f0ebe3' : '#a09890' }}
                  >
                    {day.route}
                  </div>
                </div>

                {/* Expand indicator */}
                <span
                  className="flex-shrink-0 text-[10px] transition-transform duration-200"
                  style={{
                    color: '#4a4540',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  ▾
                </span>
              </button>

              {/* Expanded body */}
              {isOpen && (
                <div className="px-2 pb-8 space-y-6" style={{ paddingLeft: '76px' }}>
                  {/* Meals */}
                  {(day.meals.breakfast || day.meals.lunch || day.meals.dinner) && (
                    <div className="grid grid-cols-3 gap-4">
                      {(['breakfast', 'lunch', 'dinner'] as const).map((meal) => {
                        const meta = mealMeta[meal]
                        return day.meals[meal] ? (
                          <div key={meal}>
                            <div className="text-[8px] tracking-[0.4em] text-[#4a4540] uppercase mb-2">
                              {meta.en}
                            </div>
                            <div className="text-xs text-[#a09890] leading-snug">{day.meals[meal]}</div>
                          </div>
                        ) : null
                      })}
                    </div>
                  )}

                  {/* Gold rule */}
                  {(day.meals.breakfast || day.meals.lunch || day.meals.dinner) && day.activities?.length > 0 && (
                    <div className="h-px bg-[#1e1c18]" />
                  )}

                  {/* Activities */}
                  {day.activities?.length > 0 && (
                    <div className="space-y-4">
                      {day.activities.map((act, j) => (
                        <div key={j} className="flex gap-4">
                          {/* Index dot */}
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-3 flex-wrap mb-1">
                              <span className="text-sm text-[#f0ebe3]">{act.name}</span>
                              {act.duration && (
                                <span className="text-[9px] tracking-[0.2em] text-[#5a5450] uppercase">{act.duration}</span>
                              )}
                            </div>
                            {act.description && (
                              <p className="text-xs text-[#6a6460] leading-relaxed mb-2">{act.description}</p>
                            )}
                            {act.references?.length > 0 && (
                              <div className="flex flex-wrap gap-3">
                                {act.references.map((ref, k) => (
                                  <a
                                    key={k}
                                    href={ref.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] text-[#c9a96e] hover:text-[#e2c99a] transition-colors"
                                  >
                                    {ref.title} ↗
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Accommodation */}
                  {day.accommodation?.name && (
                    <div className="flex items-start gap-3 pt-2 border-t border-[#1e1c18]">
                      <span className="text-[9px] tracking-[0.4em] text-[#4a4540] uppercase mt-0.5 flex-shrink-0 w-16">STAY</span>
                      <div className="flex-1 min-w-0">
                        {day.accommodation.url ? (
                          <a
                            href={day.accommodation.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#c9a96e] hover:text-[#e2c99a] transition-colors"
                          >
                            {day.accommodation.name} ↗
                          </a>
                        ) : (
                          <div className="text-xs text-[#a09890]">{day.accommodation.name}</div>
                        )}
                        <div className="text-[9px] text-[#4a4540] mt-0.5">
                          {day.accommodation.checkIn && 'Check-in  '}
                          {day.accommodation.checkOut && 'Check-out'}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {day.notes && (
                    <div className="text-xs text-[#6a6460] border-l-2 border-[#2a2720] pl-4 leading-relaxed">
                      {day.notes}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
