import styled from 'styled-components'

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  font-size: 1.2em;

  font-family: Arial;

  div, section{
    margin: 0;
    padding: 0;
  }

  @media print {
    margin-top: 0;
  }
`

export const Container = styled.div`
font-size: 0.2%;
.fristTag,
.secondTag {
  width: 100%;
  height: 50%;
}

.fristTag {
  border-bottom: 2px dashed #000;
  margin: 1.2em
}

.colorBlue {
  color: #002060;
}

.header,
.header2 {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: .2em;
  gap: .4em;
  font-size: 1.2em;
}

.header {
  border: 1px solid #000;
}

.header2 {
  border-bottom: 2px solid #002060;
}


.header h5 {
  font-weight: 600;
}

.label {
  padding: .2rem;
  font-weight: 600;
  width: 100%;
}

.description {
  background-color: #000;
  color: #fff;
  padding: .5rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5em;

  #ute{
    width: 5.5rem;
    font-size: 1.4em;
    text-align: center;
  }

  div{
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: start;
    width: 100%;
  }
}

.dataContent {
  width: 100%;
  display: flex;
  align-items: start;
  gap: .8rem;
}

.dataContent .frame {
  width: 50%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.codeContent,
.codeContent2 {
  width: 100%;
  padding: .8rem .8rem;
  font-size: 2rm;
  font-weight: 700;
}

.infoContent,
.infoContent2 {
  width: 100%;
  padding: .4rem;
  text-align: center;
  font-size: 4.6rm;
  font-weight: 700;
}

.codeContent,
.infoContent {
  border: .1rem solid #000;
}

.codeContent2,
.infoContent2 {
  border-bottom:  2px solid #002060;
  border-top: 2px solid #002060;
}

.fifo,
.qrcode {
  width: 100%;
  height: 100%;
}

.fifo {
  border: 1pxsolid #000;
}

.qrcode {
  border: 2px solid #002060;
  border-right-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.qrCodeContent {
  /* max-width: 26rem; */
  padding: .8rem;
  border-radius: .8rem;
  border: 2px solid #002060;
}


.form {
  width: 100%;
  height: 8.8rem;
  margin-top: 2.4rem;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: .4rem;
  padding: .2rem;
  background-color: #c2c2c2;
}

.formFrame {
  display: flex;
  height: 33.33%;
  width: 100%;
}

.formInput {
  border: 1px solid #000;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.widthTurno {
  width: 7rem !important;
}

.formlabel {
  min-width: 12.3rem;
  padding: .4rem 0;
  font-size: 1.4rm;
  font-weight: 600;
  margin-right: .8rem;
  text-align: end;
}

.footer {
  width: 100%;
  text-align: end;
  padding: .4rem;
}

.footer span {
  font-weight: 600;
}


`
