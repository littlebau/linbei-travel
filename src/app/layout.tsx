import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '林北旅行社',
  description: '林北家族旅遊計畫總入口',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  )
}
