import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen font-sans max-w-300 mx-auto py-4 px-4">
      <div className="flex justify-between">
        <Image src="/logo.svg" alt="Logo" width={45} height={45} />
      </div>
      <div className="py-10 text-2xl"> Hi, whats up?</div>
      <div className="max-w-2xl">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis minima pariatur vero
        tempore facilis eius aliquam asperiores ad quibusdam suscipit repellat, inventore explicabo
        delectus dolore voluptas vel qui! Error, saepe?
      </div>
    </div>
  );
}
