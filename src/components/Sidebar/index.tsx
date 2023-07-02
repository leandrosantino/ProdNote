import { useState } from 'react'
import { Aside, ToggleGroupRoot } from './style'
import { PageButton } from './PageButton'
import { useLocation } from 'react-router-dom'

export function Sidebar () {
  const { pathname } = useLocation()
  const [alignment, setAlignment] = useState(pathname)

  return (
    <Aside>
      <ToggleGroupRoot
        type='single'
        value={alignment}
        onValueChange={value => {
          if (value) setAlignment(value)
        }}
      >

        <PageButton permission='GENERATE_TAGS' value="/generateTags" >Gerar Etiquetas</PageButton>
        <PageButton permission='READ_TAGS' value="/registerTag" >Leitor de Etiquetas</PageButton>
        <PageButton permission='PLANNING' value="/planning" >Planejamento</PageButton>

      </ToggleGroupRoot>
    </Aside >
  )
}
