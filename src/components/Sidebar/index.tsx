import { useEffect, useState } from 'react'
import { Aside, ToggleGroupRoot } from './style'
import { PageButton } from './PageButton'
import { useLocation } from 'react-router-dom'

export function Sidebar () {
  const { pathname } = useLocation()
  const [alignment, setAlignment] = useState(pathname)

  useEffect(() => {
    setAlignment(pathname)
  }, [pathname])

  return (
    <Aside>

      <h2>
        Prod<span>Note</span>
      </h2>

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
