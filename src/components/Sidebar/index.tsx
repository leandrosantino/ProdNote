import { useEffect, useState } from 'react'
import { Aside, ToggleGroupRoot } from './style'
import { PageButton } from './PageButton'
import { Link, useLocation } from 'react-router-dom'
import { useSideBarShow } from '../../hooks/useSideBarShow'

export function Sidebar () {
  const { pathname } = useLocation()
  const [alignment, setAlignment] = useState(pathname)
  const { showSideBar, setShowSideBar } = useSideBarShow()

  useEffect(() => {
    setAlignment(pathname)
    if (window.innerWidth < 800) {
      setShowSideBar(false)
    }
  }, [pathname])

  if (!showSideBar) {
    return null
  }

  return (
    <Aside>

      <head>
        <Link to='/'>
          <h2>
            Prod<span>Note</span>
          </h2>
        </Link>
        <button
          onClick={() => { setShowSideBar(false) }}
        >teste</button>
      </head>

      <ToggleGroupRoot
        type='single'
        value={alignment}
      >

        <PageButton permission='GENERATE_TAGS' value="/generateTags" >Gerar Etiquetas</PageButton>
        <PageButton permission='READ_TAGS' value="/registerTag" >Leitor de Etiquetas</PageButton>
        <PageButton permission='PLANNING' value="/planning" >Planejamento</PageButton>

      </ToggleGroupRoot>
    </Aside >
  )
}
