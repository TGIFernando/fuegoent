import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <section className="flex-1 pt-32 pb-16 md:pt-40 md:pb-24 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl tracking-widest text-white text-center mb-12">
            Privacy Policy
          </h1>
          <div className="text-white/60 text-sm leading-7 space-y-4">
            <p>
              FUEGO ENTERTAINMENT operates this website. We are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-widest text-white mt-8">
              Information We Collect
            </h2>
            <p>
              We collect email addresses and phone numbers submitted through our newsletter and booth inquiry forms. We also collect standard web analytics data to improve our site.
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-widest text-white mt-8">
              How We Use Your Information
            </h2>
            <p>
              Your contact information is used solely to send event updates and respond to inquiries. We do not sell or share your data with third parties for marketing purposes.
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-widest text-white mt-8">
              Contact
            </h2>
            <p>
              For any privacy-related questions, contact us through our{" "}
              <a href="/pages/booth-inquiry" className="text-orange-400 hover:underline">
                inquiry form
              </a>
              .
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
