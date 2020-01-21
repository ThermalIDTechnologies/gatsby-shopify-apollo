import React, { useEffect, useRef, useReducer, useContext } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
// import { RichText } from 'prismic-reactjs'
import { Image, Transformation } from "cloudinary-react"
import useForm from "react-hook-form"
import ShopifyApolloContainer from "../components/ShopifyApolloContainer"
import { useSpring, a, config } from "react-spring"
import { StoreContext } from "./../context/StoreContext"
import AddToCart from "./../components/Cart/AddToCart"

import {
  StickerBuilderContainer,
  StickerImageWrapper,
  StickerBuilderForm,
  InputContainer,
  Label,
  ButtonWrapper,
} from "../components/styles/StyledProduct"
import { Button } from "../components/styles/StyledButton"

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_IMAGE_URL": {
      return {
        ...state,
        imageUrl: action.imageUrl,
      }
    }
    case "SET_TEXT": {
      return {
        ...state,
        text: action.text,
      }
    }
    case "SET_TEXT_2": {
      return {
        ...state,
        text2: action.text2,
      }
    }
    case "SET_FONT_FAMILY": {
      return {
        ...state,
        fontFamily: action.fontFamily,
      }
    }
    case "SET_FONT_FAMILY_2": {
      return {
        ...state,
        fontFamily2: action.fontFamily2,
      }
    }
    case "SET_FONT_SIZE": {
      return {
        ...state,
        fontSize: action.fontSize,
      }
    }
    case "SET_FONT_SIZE_2": {
      return {
        ...state,
        fontSize2: action.fontSize2,
      }
    }
    case "SET_FONT_COLOR": {
      return {
        ...state,
        fontColor: action.fontColor,
      }
    }
    case "SET_FONT_COLOR_2": {
      return {
        ...state,
        fontColor2: action.fontColor2,
      }
    }
    case "SET_GRAVITY": {
      return {
        ...state,
        gravity: action.gravity,
      }
    }
    case "SET_GRAVITY_2": {
      return {
        ...state,
        gravity2: action.gravity2,
      }
    }
    case "SET_SUBMITTED": {
      return {
        ...state,
        isSubmitted: action.isSubmitted,
      }
    }
    default:
      return state
  }
}

const StickerTwoTemplate = ({ data }) => {
  const doc = data.prismic.allProducts.edges.slice(0, 1).pop()

  const { selectedVariant } = useContext(StoreContext)

  const initialState = {
    imageUrl: "",
    text: `${doc.node.sticker_text[0].text}`,
    text2: `${doc.node.sticker_text_2[0].text}`,
    fontFamily: `${doc.node.font_family}`,
    fontFamily2: `${doc.node.font_family_2}`,
    fontSize: `${doc.node.font_size[0].text}`,
    fontSize2: `${doc.node.font_size_2[0].text}`,
    fontColor: `${doc.node.font_color}`,
    fontColor2: `${doc.node.font_color_2}`,
    gravity: `${doc.node.gravity}`,
    gravity2: `${doc.node.gravity_2}`,
    isSubmitted: false,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const { register, errors, handleSubmit } = useForm({
    mode: "onChange",
  })
  const onSubmit = data => {
    const reformattedText = data.text.replace(/(\r\n|\n|\r)/gm, "%0A")
    const reformattedText2 = data.text2.replace(/(\r\n|\n|\r)/gm, "%0A")
    dispatch({
      type: "SET_TEXT",
      text: reformattedText,
    })
    dispatch({
      type: "SET_TEXT_2",
      text2: reformattedText2,
    })
    dispatch({
      type: "SET_FONT_FAMILY",
      fontFamily: data.fontFamily,
    })
    dispatch({
      type: "SET_FONT_FAMILY_2",
      fontFamily2: data.fontFamily2,
    })
    dispatch({
      type: "SET_FONT_COLOR",
      fontColor: data.fontColor,
    })
    dispatch({
      type: "SET_FONT_COLOR_2",
      fontColor2: data.fontColor2,
    })
    dispatch({
      type: "SET_SUBMITTED",
      isSubmitted: true,
    })
  }

  const imageRef = useRef("")

  useEffect(() => {
    console.log(imageRef.current.state.url)
    dispatch({
      type: "SET_IMAGE_URL",
      imageUrl: imageRef.current.state.url,
    })
  }, [imageRef.current.state])

  const errorFade = useSpring({
    opacity: errors.text ? 1 : 0,
    height: errors.text ? 24 : 0,
  })

  const imgFade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: config.gentle,
  })

  if (!doc) return null

  console.log(doc.node)

  return (
    <Layout>
      <h1>{doc.node.sticker.title}</h1>
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
            <Transformation
              width={doc.node.width_2[0].text}
              height={doc.node.height_2[0].text}
              overlay={{
                fontFamily: `${state.fontFamily2}`,
                fontSize: `${state.fontSize2}`,
                fontWeight: "regular",
                text: `${state.text2}`,
              }}
              gravity={state.gravity2}
              x={doc.node.x_2[0].text}
              y={doc.node.y_2[0].text}
              crop="limit"
              color={state.fontColor2}
            />
            <Transformation quality="auto" fetchFormat="auto" />
          </Image>
        </StickerImageWrapper>
        <StickerBuilderForm>
          <form onSubmit={handleSubmit(onSubmit)}>
            <>
              <Label htmlFor="text">Customize First Line</Label>
              <textarea
                name="text"
                placeholder="Edit me!"
                ref={register({ required: true })}
              />
              <a.p style={errorFade}>This is required</a.p>
              <InputContainer>
                <div>
                  <Label htmlFor="fontFamily">Change Font Family</Label>
                  <select name="fontFamily" ref={register}>
                    <option value="Impact">Impact</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Bangers">Bangers</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="fontColor">Pick Font Color</Label>
                  <input type="color" name="fontColor" ref={register} />
                </div>
              </InputContainer>
            </>

            <>
              <Label htmlFor="text2">Customize Second Line</Label>
              <textarea
                name="text2"
                placeholder="Edit me!"
                ref={register({ required: true })}
              />
              <a.p style={errorFade}>This is required</a.p>
              <InputContainer>
                <div>
                  <Label htmlFor="fontFamily2">Change Font Family</Label>
                  <select name="fontFamily2" ref={register}>
                    <option value="Impact">Impact</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Bangers">Bangers</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="fontColor2">Pick Font Color</Label>
                  <input type="color" name="fontColor2" ref={register} />
                </div>
              </InputContainer>
            </>

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
    </Layout>
  )
}

export default StickerTwoTemplate

export const query = graphql`
  query($uid: String!) {
    prismic {
      allProducts(uid: $uid) {
        edges {
          node {
            sticker
            _meta {
              uid
            }
            sticker_text
            sticker_text_2
            cloud_name
            public_id
            font_color
            font_color_2
            font_family
            font_family_2
            font_size
            font_size_2
            gravity
            gravity_2
            height
            height_2
            width
            width_2
            x
            x_2
            y
            y_2
          }
        }
      }
    }
  }
`
