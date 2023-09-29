import { Button } from "@/components/Button"
import { TRegisterFormSchema } from "@/lib/schemas"
import { useEffect, useRef } from "react"
import { UseFormSetValue } from "react-hook-form"
import SignatureCanvas from "react-signature-canvas"

type SignatureFormProps = {
  setValue: UseFormSetValue<TRegisterFormSchema>
}
export const SignatureForm = ({ setValue }: SignatureFormProps) => {
  const signatureRef = useRef<SignatureCanvas>(null)

  const handleClear = () => signatureRef.current && signatureRef.current.clear()

  const handleSave = () => {
    if (signatureRef.current) {
      signatureRef.current.getTrimmedCanvas().toBlob((blob) => {
        const file = new File([blob as Blob], "signature.png", { type: "image/png" })
        setValue("signatureFile", file)
      })
    }
  }

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
    <div className="mt-6 grid w-full grid-cols-1 justify-center gap-x-4 gap-y-6">
      <div className="w-full max-w-xl">
        <SignatureCanvas
          ref={signatureRef}
          onEnd={handleSave}
          canvasProps={{
            width: "100%",
            height: 260,
            className: "border border-dark rounded w-full",
          }}
        />
        <div className="mt-2 flex gap-2">
          <Button className="btn-secondary" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  )
}
