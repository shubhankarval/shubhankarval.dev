import Sidebar from '@components/sidebar/Sidebar';
import Bio from '@components/sections/Bio';
import Experience from '@components/sections/experience/Experience';
import Work from '@components/sections/work/Work';
import Credentials from '@components/sections/credentials/Credentials';
import Activity from '@components/sections/activity/Activity';
import Footer from '@components/sections/Footer';

export default async function Home() {
  return (
    <div className="mx-auto grid max-w-267 items-start gap-8 px-6 pt-8 pb-18 lg:grid-cols-[314px_1fr] lg:gap-15">
      <Sidebar />
      <main className="flex min-w-0 flex-col gap-9">
        <Bio />
        <Experience />
        <Work />
        <Credentials />
        <Activity />
        <Footer />
      </main>
    </div>
  );
}
