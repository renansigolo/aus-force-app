import { useEffect, useRef } from "react"
import SignatureCanvas from "react-signature-canvas"

export const SignatureForm = () => {
  const signatureRef = useRef<SignatureCanvas>(null)

  const handleClear = () => signatureRef.current && signatureRef.current.clear()

  // const handleSave = () => {
  //   if (signatureRef.current) {
  //     const signatureData = signatureRef.current.toDataURL()
  //     // Do something with the signature data (e.g., save it to a database)
  //     console.log(signatureData)
  //   }
  // }

  useEffect(() => {
    const resizeCanvas = () => {
      if (signatureRef.current) {
        const canvas = signatureRef.current.getCanvas()
        const containerWidth = canvas.parentElement?.clientWidth
        canvas.width = Number(containerWidth)
      }
    }

    // Call the resizeCanvas function when the window is resized
    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  return (
    <div style={{ width: "100%", maxWidth: "580px" }}>
      <SignatureCanvas
        ref={signatureRef}
        canvasProps={{
          width: "100%",
          height: 260,
          className: "border border-dark rounded w-full",
        }}
      />
      <div className="mt-2 flex gap-2">
        <button className="btn" onClick={handleClear}>
          Clear
        </button>
        {/* <button className="btn" onClick={handleSave}>
          Save
        </button> */}
      </div>
    </div>
  )
}
