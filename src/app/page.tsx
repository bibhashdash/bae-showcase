import {Button} from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex w-full h-screen flex-col bg-white sm:items-start">
       <p className="text-black">BAE Showcase App</p>
          <Button>Hello</Button>
      </main>
    </div>
  );
}
