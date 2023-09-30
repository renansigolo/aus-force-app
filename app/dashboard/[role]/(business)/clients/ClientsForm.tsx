import { Button } from "@/components/Button"

export function ClientsForm() {
  return (
    <form className="my-8 grid gap-4">
      <div>
        <label htmlFor="businessName">Business Name</label>
        <input id="businessName" type="text" name="businessName" placeholder="Full Name" />
      </div>

      <div>
        <label htmlFor="businessEmail">Email</label>
        <input
          id="businessEmail"
          type="email"
          name="businessEmail"
          placeholder="example@email.com"
        />
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
