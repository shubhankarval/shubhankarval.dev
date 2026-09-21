import SectionHeader from '@components/ui/SectionHeader';
import { credentials } from '@content/credentials';
import CredentialItem from './CredentialItem';

export default function Credentials() {
  return (
    <section>
      <SectionHeader title="Credentials" meta={`edu \u00B7 cert`} />
      <ul className="glass grid overflow-hidden rounded-lg border border-line sm:grid-cols-2">
        {credentials.map((credential) => (
          <CredentialItem key={credential.title} {...credential} />
        ))}
      </ul>
    </section>
  );
}
