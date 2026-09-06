import Sidebar from '@components/sidebar/Sidebar';
import Work from '@components/sections/work/Work';
import Credentials from '@components/sections/credentials/Credentials';

export default async function Home() {
  return (
    <div className="mx-auto grid max-w-265 items-start gap-8 px-6 pt-8 pb-18 lg:grid-cols-[300px_1fr] lg:gap-12">
      <Sidebar />
      <main className="flex min-w-0 flex-col gap-9">
        <Work />
        <Credentials />
      </main>
    </div>
  );
}
