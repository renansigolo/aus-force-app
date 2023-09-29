import { Button } from "@/components/Button"

export function ClientsForm() {
  return (
    <form className="my-8 grid gap-4">
      <div>
        <label htmlFor="businessName" className="form-label">
          Business Name
        </label>
        <input type="text" name="businessName" placeholder="Full Name" />
      </div>

      <div>
        <label htmlFor="businessEmail" className="form-label">
          Email
        </label>
        <input type="email" name="businessEmail" placeholder="example@email.com" />
      </div>

      <div className="mt-5 gap-2 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button type="submit" className="btn-success">
          Submit
        </Button>
        <Button href="?showModal=false" className="btn-secondary">
          Cancel
        </Button>
      </div>
    </form>
  )
}
