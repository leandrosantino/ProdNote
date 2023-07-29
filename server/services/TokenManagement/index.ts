import { TokenManagement } from './TokenManagement'
import { JwtProvider } from '../../providers/implementations/JwtProvider'

const jwt = new JwtProvider()

export const tokenManagement = new TokenManagement(
  jwt
)
