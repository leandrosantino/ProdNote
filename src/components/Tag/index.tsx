import { type Product } from '../../../server/entities/Product'
import { Container, Content } from './style'
// import { QRCodeSVG } from 'qrcode.react'

interface TagProps {
  productInfo?: {
    data: Product
    isFractional: boolean
  }
}

export function Tag ({ productInfo }: TagProps) {
  const product = productInfo?.data
  const isFractional = productInfo?.isFractional

  const id = '1234556780'

  // const qrcode = (
  //   <>
  //     < QRCodeSVG
  //       id="qrCode"
  //       value={JSON.stringify({
  //         productId: product?.id,
  //         tagId: id,
  //         amount: isFractional ? 0 : product?.amount
  //       })}
  //       size={240}
  //       fgColor='#002060'
  //       bgColor={'#fff '} level={'H'}
  //     />
  //   </>
  // )

  if (productInfo === undefined) {
    return
  }

  return (
    <Container>
      <Content className='container' >

        <div className='fristTag' >
          <header className='header' >
            <h2>ETIQUETA DE PRODUTO ACABADO</h2>
            <h4>ADLER PELZER PE</h4>
          </header>

          <div className='label' >DESCRIÇÃO:</div>

          <div className='description'>
            <div>
              <span>{product?.description}</span>
              <span>{product?.technicalDescription}</span>
            </div>
            <span id='ute' >{product?.ute}</span>
          </div>

          <section className='dataContent' >
            <div className='frame' >
              <div className='label' >MODELO:</div>
              <div className='codeContent'>
                {product?.projectNumber}
              </div>

              <div className='label' >CODIGO ADLER:</div>
              <div className='codeContent'>
                {product?.sapCode}
              </div>

              <div className='label' >QUANTIDADE:</div>
              <div className='infoContent'>
                {isFractional ? '' : product?.amount}
              </div>

              <div className='label' >CODIGO JEEP:</div>
              <div className='infoContent' >
                {product?.partNumber}
              </div>
            </div>

            <div className='frame' >
              <div className='label' >FIFO:</div>
              <div className='fifo'> d</div>

              <div className='form'>

                <div className='formFrame' >
                  <div className='formlabel' >RESPONSÁVEL:</div>
                  <div className='formInput'></div>
                </div>

                <div className='formFrame' >
                  <div className='formlabel' >OPERADOR:</div>
                  <div className='formInput'></div>
                </div>

                <div className='formFrame' >
                  <div className='formlabel' >TURNO:</div>
                  <div className='widthTurno formInput'></div>
                </div>

              </div>
            </div>
          </section>

          <div className="footer">
            <span>ID:</span> {id?.toUpperCase()}
          </div>

        </div>

        <div className='secondTag colorBlue'
          style={{ border: '.2rem solid #002060' }}
        >
          <header className='header2'
          >
            <h2>ETIQUETA DE PRODUTO ACABADO</h2>
            <h4>ADLER PELZER PE</h4>
          </header>

          <div className='label' >DESCRIÇÃO:</div>

          <div className='description'
            style={{ backgroundColor: '#002060' }}>
            <div>
              <span>{product?.description}</span>
              <span>{product?.technicalDescription}</span>
            </div>
            <span id='ute'>{product?.ute}</span>
          </div>

          <section className='dataContent' style={{ gap: 0 }} >
            <div className='frame' >
              <div className='label' >MODELO:</div>
              <div className='codeContent2 colorBlue'>
                {product?.projectNumber}
              </div>

              <div className='label' >CODIGO ADLER:</div>
              <div className='codeContent2 colorBlue'>
                {product?.sapCode}
              </div>

              <div className='label' >QUANTIDADE:</div>
              <div className='infoContent2 colorBlue'>
                {isFractional ? '' : product?.amount}
              </div>

              <div className='label' >CODIGO JEEP:</div>
              <div className='infoContent2 colorBlue' >
                {product?.partNumber}
              </div>
            </div>

            <div className='frame ' >
              <div className='label' >QRCODE:</div>
              <div className='qrcode colorBlue'>
                <div className='qrCodeContent' >
                  {/* {qrcode} */}
                </div>
              </div>
            </div>
          </section>

          <div className="footer">
            <span>ID:</span> {id?.toUpperCase()}
          </div>

        </div>

      </Content>
    </Container>
  )
}
