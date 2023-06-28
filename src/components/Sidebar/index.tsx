import { useEffect, useState } from 'react'
import { Aside } from './style'
import { ToggleButtonGroup, useTheme } from '@mui/material'

import { useLocation } from 'react-router-dom'
import { PageButton } from '../PageButton'

export function Sidebar () {
  const { pathname } = useLocation()
  const [alignment, setAlignment] = useState(pathname)
  const { palette: { mode } } = useTheme()
  // const navigate = useNavigate()

  useEffect(() => {
    setAlignment(pathname)
  }, [pathname])

  return (
    <Aside>

      <ToggleButtonGroup
        color={mode === 'dark' ? 'primary' : 'standard'}
        value={alignment}
        exclusive
        onChange={(_, newAlignment) => {
          if (newAlignment) {
            setAlignment(newAlignment)
          }
        }}
        orientation="vertical"
      >

        <PageButton permission='GENERATE_TAGS' value="/generateTags" >Gerar Etiquetas</PageButton>
        <PageButton permission='READ_TAGS' value="/registerTag" >Leitor de Etiquetas</PageButton>
        <PageButton permission='PLANNING' value="/planning" >Planejamento</PageButton>

      </ToggleButtonGroup>

    </Aside >
  )
}
