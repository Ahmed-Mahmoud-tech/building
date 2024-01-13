'use client'
import React from 'react'
import Base from '../../components/Base/Base'
import { setPopStatus } from '@/store/slices/info'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAreaNumber } from '@/store/slices/areas'
import Link from 'next/link'

export default function Page() {
  const dispatch = useDispatch()
  dispatch(setCurrentAreaNumber(2))

  return (
    <ul>
      <li className="flex flex-col text-white">
        <Link href="/">main</Link>
        {/* <Link href="/bedroom">bedroom</Link> */}
        <Link href="/bicycle" target="_blank">
          bicycle
        </Link>
        <Link href="/cafe">cafe</Link>
        <Link href="/outdoor">outdoor</Link>
        <Link href="/sydney">sydney</Link>
        <Link href="/cartoon">cartoon</Link>
        {/* <Link href="/garage">garage</Link> */}
        {/* <Link href="/mosque">mosque</Link> */}
        {/* <Link href="/drawing">drawing</Link> */}
        {/* <Link href="/war">war</Link> */}
      </li>
    </ul>
  )
}
