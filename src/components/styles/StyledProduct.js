import styled from "styled-components"
import { colors } from "../styles/GlobalStyle"
import { a } from "react-spring"

export const StickerBuilderContainer = styled.section`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 1.5rem;

  @media screen and (min-width: 375px) {
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  }
`

export const StickerImageWrapper = styled(a.figure)`
  display: flex;
  justify-content: center;
  margin: 0;

  img {
    width: 100%;
    max-width: 500px;
  }
`

export const StickerBuilderForm = styled.div`
  display: flex;
  justify-content: center;

  form {
    width: 100%;
    max-width: 500px;
    flex-direction: row;

    textarea {
      width: 100%;
      padding: 12px 20px;
      margin-top: 0.5rem;
      margin-bottom: 1.5rem;
      box-sizing: border-box;
      border: none;
      /* border: 1px solid ${colors.darkBlue}; */
      border-radius: 3px;
      resize: vertical;
      height: 45px;
      background: ${colors.darkBlue};
      color: white;
    }

    p {
      color: ${colors.pink};
      margin: 0 0 1rem;
    }
  }

  @media screen and (min-width: 770px) {
    form {
      width: auto;
      margin-left: 1rem;
    }
  }
`

export const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;

  input,
  select {
    margin-bottom: 1.5rem;
    margin-top: 0.5rem;
    border: none;
    border-radius: 3px;
    background: ${colors.darkBlue};
    color: white;
    width: 100%;
    padding: 3px;
  }
`

export const Label = styled.label`
  margin-right: 0.5rem;
`

export const ButtonWrapper = styled(a.div)`
  text-align: right;
  
  button {
    margin-top: 1rem;
  }
`

export const VariantContainer = styled(a.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const Price = styled.p`
  margin: 0;
`

export const StickerUploadContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  min-height: 250px;
`

export const StickerUploadProcess = styled.ol`
  margin: 2rem 0;
`

export const UploadedStickerImage = styled(a.img)`
  max-width: 300px;
  max-height: 300px;
`