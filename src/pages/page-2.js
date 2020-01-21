import React, { useState } from "react"
// import { Link } from "gatsby"
import SEO from "../components/seo"

import Layout from "../components/layout"
import SkeletonLoader from "tiny-skeleton-loader-react"

const SecondPage = () => {
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [publicId, setPublicId] = useState("")

  const uploadImage = async e => {
    const files = e.target.files
    const formData = new FormData()
    formData.append("file", files[0])
    formData.append("upload_preset", "stickers")
    setLoading(true)
    setError("")

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/crjars/image/upload",
        {
          method: "POST",
          body: formData,
        }
      )
      const file = await res.json()
      console.log("TCL: SecondPage -> file", file)
      file.error ? setError(file.error.message) :  setImage(file.secure_url) 

      error === "" && setPublicId(file.public_id)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <Layout>
      <SEO title="Page two" />
      <h1>Upload Image</h1>
      <input
        type="file"
        name="file"
        placeholder="Upload your image"
        onChange={uploadImage}
      />
      {loading ? (
        <SkeletonLoader width="300px" height="300px" />
      ) : (
        <>
          <img style={{ maxWidth: `300px` }} src={image} />
          <p>{publicId}</p>
        </>
      )}
      {error !== "" && <pre style={{ overflowX: "scroll" }}>{error}</pre>}
    </Layout>
  )
}

export default SecondPage

// https://api.cloudinary.com/v1_1/crjars
