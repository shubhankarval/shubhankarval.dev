import Image from 'next/image';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <Image src="/logo.svg" alt="Logo" width={45} height={45} />
      </div>
      <div className="text-3xl font-bold">Hi, I&apos;m Shubhankar</div>
      <div className="max-w-2xl">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quaerat modi itaque dicta?
        Sunt dolor dolore voluptates temporibus sed magni pariatur laudantium possimus consequuntur
        illum, ducimus error autem fugit ratione!
      </div>
    </div>
  );
}
