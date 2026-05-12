import Link from "next/link";
import { InstagramIcon, YouTubeIcon, TikTokIcon } from "./icons";

const socialLinks = [
  { icon: InstagramIcon, href: "https://www.instagram.com/thisisfuegoent/", label: "Instagram" },
  { icon: YouTubeIcon, href: "https://www.youtube.com/@thisisfuegoent", label: "YouTube" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@fuegoent", label: "TikTok" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-lg tracking-widest text-white hover:text-orange-400 transition-colors"
          >
            FUEGO ENTERTAINMENT
          </Link>

          {/* Social links */}
          <div className="flex items-center gap-5">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/60 hover:text-white transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 text-xs text-white/50">
            <Link href="/policies/privacy-policy" className="hover:text-white/80 transition-colors uppercase tracking-wider">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/policies/terms-of-service" className="hover:text-white/80 transition-colors uppercase tracking-wider">
              Terms and Policies
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-white/30 tracking-wider">
          <a
            href="https://www.instagram.com/fernando._.chavez/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/60 transition-colors"
          >
            Made By TGIFmedia
          </a>
          <span className="hidden sm:inline">·</span>
          <span>© 2026 FUEGO ENTERTAINMENT</span>
        </div>
      </div>
    </footer>
  );
}
