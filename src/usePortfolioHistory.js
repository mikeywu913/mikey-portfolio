import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export function usePortfolioHistory(initial) {
  const [view, setView] = useState(() => history.state?.portfolio ? history.state.view : initial)
  const current = useRef(view)
  const homeScroll = useRef(0)
  const pendingScroll = useRef(null)
  useEffect(() => {
    const base = { ...initial, archive: null, activeImage: null, activeVideo: null, activeProject: null }
    if (!history.state?.portfolio) {
      history.replaceState({ portfolio: true, view: base, scroll: 0, depth: 0 }, '', location.pathname)
      if (initial.archive) history.pushState({ portfolio: true, view: { ...initial, activeVideo: null }, scroll: 0, depth: 1 }, '', `?archive=${initial.archive}`)
      if (initial.activeVideo) history.pushState({ portfolio: true, view: initial, scroll: 0, depth: 2 }, '', `?work=${initial.activeVideo.id}`)
    }
    const onPop = event => {
      if (!event.state?.portfolio) return
      current.current = event.state.view
      pendingScroll.current = event.state.scroll || 0
      setView(event.state.view)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  useLayoutEffect(() => {
    if (pendingScroll.current !== null) {
      const y = pendingScroll.current
      pendingScroll.current = null
      window.scrollTo({ top: y, behavior: 'instant' })
    }
  }, [view])
  const navigate = patch => {
    const prev = current.current
    if (!prev.archive) homeScroll.current = window.scrollY
    const next = { ...prev, ...patch }
    if (JSON.stringify(prev) === JSON.stringify(next)) return
    const state = history.state || { portfolio: true, depth: 0 }
    history.replaceState({ ...state, view: prev, scroll: window.scrollY }, '')
    const url = new URL(location.href)
    url.search = ''; url.hash = ''
    if (next.archive) url.searchParams.set('archive', next.archive)
    if (next.activeVideo) url.searchParams.set('work', next.activeVideo.id)
    if (next.activeImage) url.searchParams.set('image', next.activeImage.id)
    if (next.activeProject) url.searchParams.set('project', next.activeProject.id)
    history.pushState({ portfolio: true, view: next, scroll: next.archive !== prev.archive ? 0 : window.scrollY, depth: (state.depth || 0) + 1 }, '', url)
    current.current = next
    if (next.archive !== prev.archive) pendingScroll.current = next.archive ? 0 : homeScroll.current
    setView(next)
  }
  const closeDialog = () => {
    navigate({ activeImage: null, activeVideo: null, activeProject: null })
  }
  return { view, navigate, closeDialog }
}
