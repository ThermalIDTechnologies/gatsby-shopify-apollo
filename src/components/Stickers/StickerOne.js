import React, { useReducer, useRef, useEffect, useContext } from "react"
import { StoreContext } from "./../../context/StoreContext"
import { Image, Transformation } from "cloudinary-react"
// import useForm from "react-hook-form"
import ShopifyApolloContainer from "../ShopifyApolloContainer"
import AddToCart from "../Cart/AddToCart"
import { useSpring, config } from "react-spring"

import {
  StickerBuilderContainer,
  StickerImageWrapper,
  StickerBuilderForm,
  InputContainer,
  Label,
  ButtonWrapper,
} from "../styles/StyledProduct"
import { Button } from "../styles/StyledButton"

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FONT_COLOR": {
      return {
        ...state,
        fontColor: action.fontColor,
      }
    }
    case "SET_TEXT": {
      return {
        ...state,
        text: action.text,
      }
    }
    case "SET_FONT_FAMILY": {
      return {
        ...state,
        fontFamily: action.fontFamily,
      }
    }
    case "SET_SUBMITTED": {
      return {
        ...state,
        isSubmitted: action.isSubmitted,
      }
    }
    case "SET_IMAGE_URL": {
      return {
        ...state,
        imageUrl: action.imageUrl,
      }
    }
    default:
      return state
  }
}

const StickerOne = ({ doc }) => {
  const { selectedVariant } = useContext(StoreContext)

  const initialState = {
    imageUrl: "",
    text: doc.node.sticker_text[0].text,
    fontFamily: doc.node.font_family,
    fontSize: doc.node.font_size[0].text,
    fontColor: doc.node.font_color,
    gravity: doc.node.gravity,
    isSubmitted: false,
    title: doc.node.sticker.title,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const imageRef = useRef("")
  const customTextRef = useRef()
  const fontFamilyRef = useRef()
  const fontColorRef = useRef()

  useEffect(() => {
    console.log(imageRef.current.state.url)
    dispatch({
      type: "SET_IMAGE_URL",
      imageUrl: imageRef.current.state.url,
    })
  }, [imageRef.current.state])

  const handleSubmit = e => {
    e.preventDefault()
    const reformattedText = customTextRef.current.value.replace(
      /(\r\n|\n|\r)/gm,
      "%0A"
    )
    dispatch({
      type: "SET_TEXT",
      text: reformattedText,
    })
    dispatch({
      type: "SET_FONT_FAMILY",
      fontFamily: fontFamilyRef.current.value,
    })
    dispatch({
      type: "SET_FONT_COLOR",
      fontColor: fontColorRef.current.value,
    })
    dispatch({
      type: "SET_SUBMITTED",
      isSubmitted: true,
    })
  }

  const imgFade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: config.gentle,
  })

  return (
    <>
      <StickerBuilderContainer>
        <StickerImageWrapper style={imgFade}>
          <Image
            cloudName={doc.node.cloud_name[0].text}
            publicId={doc.node.public_id[0].text}
            ref={imageRef}
            secure
          >
            <Transformation width="auto" crop="scale" />
            <Transformation
              width={doc.node.width[0].text}
              height={doc.node.height[0].text}
              overlay={{
                fontFamily: `${state.fontFamily}`,
                fontSize: `${state.fontSize}`,
                fontWeight: "regular",
                text: `${state.text}`,
              }}
              gravity={state.gravity}
              x={doc.node.x[0].text}
              y={doc.node.y[0].text}
              crop="limit"
              color={state.fontColor}
            />
            <Transformation quality="auto" fetchFormat="auto" />
          </Image>
        </StickerImageWrapper>
        <StickerBuilderForm>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="text">Customize Text</Label>
            <textarea
              name="text"
              placeholder="Edit me!"
              ref={customTextRef}
              required
            />
            <InputContainer>
              <div>
                <Label htmlFor="fontFamily">Change Font Family</Label>
                <select name="fontFamily" ref={fontFamilyRef}>
                  <option value="Impact">Impact</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Bangers">Bangers</option>
                </select>
              </div>
              <div>
                <Label htmlFor="fontColor">Pick Font Color</Label>
                <input type="color" name="fontColor" ref={fontColorRef} />
              </div>
            </InputContainer>
            <ButtonWrapper>
              <Button
                mt={2}
                p={2}
                borderRadius={1}
                border="none"
                bg="blue"
                color="white"
                type="submit"
              >
                Stickerize It!
              </Button>
            </ButtonWrapper>
          </form>
        </StickerBuilderForm>
      </StickerBuilderContainer>
      <ShopifyApolloContainer
        handle={doc.node._meta.uid}
        isSubmitted={state.isSubmitted}
      >
        {selectedVariant ? (
          <AddToCart
            variantId={selectedVariant.node.id}
            cloudinaryImgUrl={state.imageUrl}
          />
        ) : null}
      </ShopifyApolloContainer>
    </>
  )
}

export default StickerOne
