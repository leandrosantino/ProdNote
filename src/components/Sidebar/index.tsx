import { useState } from "react";
import { Aside, PageButton } from "./style";
import { ToggleButtonGroup } from '@mui/material'
import { useTheme } from '@mui/material'

export function Sidebar() {

  const [alignment, setAlignment] = useState('web');
  const { palette: { mode } } = useTheme()

  return (
    <Aside>

      <ToggleButtonGroup
        color={mode == 'dark' ? 'primary' : 'standard'}
        value={alignment}
        exclusive
        onChange={(_, newAlignment) => {
          if (newAlignment) {
            setAlignment(newAlignment);
          }
        }}
        orientation="vertical"
      >
        <PageButton value="web">Gerar Etiquetas</PageButton>
        <PageButton value="android">Leitor de Etiquetas</PageButton>
        <PageButton value="ios">Planejamento</PageButton>
      </ToggleButtonGroup>

    </Aside >
  )
}
