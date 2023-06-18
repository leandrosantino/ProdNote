import { useEffect, useState } from 'react'
import { Aside, PageButton } from './style'
import { ToggleButtonGroup, useTheme } from '@mui/material'

import { useLocation, useNavigate } from 'react-router-dom'

export function Sidebar () {
  const { pathname } = useLocation()
  const [alignment, setAlignment] = useState(pathname)
  const { palette: { mode } } = useTheme()
  const navigate = useNavigate()

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
        <PageButton onClick={() => { navigate('/') }} value="/">Gerar Etiquetas</PageButton>
        <PageButton onClick={() => { navigate('/registerTag') }} value="/registerTag">Leitor de Etiquetas</PageButton>
        <PageButton onClick={() => { navigate('/planning') }} value="/planning">Planejamento</PageButton>
      </ToggleButtonGroup>

    </Aside >
  )
}
