import { BsSaveFill } from 'react-icons/bs'
import { InfoCase, InfoGroup, RegisterButton } from './styles'
import { type Product } from '../../../server/entities/Product'

interface InfoGridProps {
  info: {
    product: Product
    tagId: string
    isFractional: boolean
  }
  onRegister: () => void
}

export function InfoGrid ({ info: { tagId, product }, onRegister }: InfoGridProps) {
  return (
    <div>
      <InfoCase>
        <span>Descrição Operacional:</span>
        <div> {product?.description}</div>
      </InfoCase>
      <InfoCase>
        <span>Descrição Técnica:</span>
        <div>{product?.technicalDescription}</div>
      </InfoCase>

      <InfoGroup>
        <InfoCase>
          <span>ID do Porduto:</span>
          <div> {product?.id}</div>
        </InfoCase>
        <InfoCase>
          <span>ID da Etiqueta:</span>
          <div> {tagId}</div>
        </InfoCase>
      </InfoGroup>

      <InfoGroup>
        <InfoCase>
          <span>Ute:</span>
          <div>{product?.ute}</div>
        </InfoCase>
        <InfoCase id="project" >
          <span>Projeto:</span>
          <div>{product?.projectNumber}</div>
        </InfoCase>
        <InfoCase >
          <span>Código SAP:</span>
          <div id="sapCode"> {product?.sapCode}</div>
        </InfoCase>
        <InfoCase>
          <span>Classificação:</span>
          <div>{product?.classification}</div>
        </InfoCase>
      </InfoGroup>

      <InfoGroup>
        <InfoCase>
          <span>PartNumber:</span>
          <div>{product?.partNumber}</div>
        </InfoCase>
        <InfoCase>
          <span>Quant. Embalagem:</span>
          <div> {product?.amount} </div>
        </InfoCase>
        {/* <InfoCase>
          <span>Quant. Fracionada:</span>
          <div>30</div>
        </InfoCase> */}
        <RegisterButton
          onClick={onRegister}
        >
          Registrar
          <BsSaveFill size={15} />
        </RegisterButton>
      </InfoGroup>
    </div>
  )
}
