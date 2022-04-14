import Head from 'next/head';
import AppBanner from '../src/components/AppBanner';
import ContactForm from '../src/components/ContactForm';

export default function Contact() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <AppBanner
        size="S"
        title="Restons en contact!"
        breadcrumbs={[
          {
            label: 'Accueil',
            url: '/',
          },
          {
            label: 'Contact',
            url: '/contact',
          },
        ]}
      />
      <ContactForm />
    </div>
  );
}