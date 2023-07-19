import { Loader } from "@/components/Loader";

export default function Loading() {
  return (
    <section className="grid h-screen place-content-center">
      <Loader show />
    </section>
  );
}
