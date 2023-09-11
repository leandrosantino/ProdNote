import { useEffect, useState } from 'react'
import { AbsoluteContainer, Aside, ToggleGroupRoot } from './style'
import { PageButton } from './PageButton'
import { Link, useLocation } from 'react-router-dom'
import { useSideBarShow } from '../../hooks/useSideBarShow'
import { ShowSideBarButton } from '../ShowSideBarButton'

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

  return (
    <>
      <Aside
      data-show={showSideBar ? 'on' : 'off'}
    >

      <header>
        <ShowSideBarButton onClick={() => { setShowSideBar(false) }} />
        <Link to='/'>
          <h2>
            Prod<span>Note</span>
          </h2>
        </Link>
      </header>

      <ToggleGroupRoot
        type='single'
        value={alignment}
      >

        <PageButton permission='GENERATE_TAGS' value="/generateTags" >Gerar Etiquetas</PageButton>
        <PageButton permission='READ_TAGS' value="/registerTag" >Leitor de Etiquetas</PageButton>
        <PageButton permission='OEE_NOTE' value="/registerOEE" >Registro de Eficiência</PageButton>
        <PageButton permission='OEE_NOTE' value="/oeeDashboard" >Dashboard OEE</PageButton>
        <PageButton permission='PLANNING' value="/planning" >Planejamento</PageButton>

      </ToggleGroupRoot>
    </Aside >
    {
      window.innerWidth < 1000 && showSideBar &&
      <AbsoluteContainer
        onClick={() => {
          if (window.innerWidth < 1000) {
            setShowSideBar(false)
          }
        }}
      />
    }
    </>
  )
}
