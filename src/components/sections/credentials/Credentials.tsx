import SectionHeader from '@components/ui/SectionHeader';
import { credentials } from '@content/credentials';
import CredentialItem from './CredentialItem';

export default function Credentials() {
  return (
    <section>
      <SectionHeader title="Credentials" meta="education • certification" />
      <ul className="grid overflow-hidden rounded-lg border border-line bg-bg-raised lg:grid-cols-2">
        {credentials.map((credential) => (
          <CredentialItem key={credential.title} {...credential} />
        ))}
      </ul>
    </section>
  );
}
