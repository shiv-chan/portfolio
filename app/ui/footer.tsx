import Link from 'next/link';
import SocialMedia from "@/app/ui/socialMedia";
import clsx from 'clsx';

export default function Footer({ className } : { className?: string } ) {
       return (
           <footer className={clsx(className, "md:fixed md:bottom-0 m-8 text-lavender")}>
               <SocialMedia />
               <div className="my-2 flex gap-x-2 text-xs">
                   <Link href="/works" className="font-bold">Works</Link> |
                   <Link href="/about" className="font-bold">About</Link> |
                   <Link href="/contact" className="font-bold">Contact</Link>
               </div>
               <div className="my-2 flex gap-x-2 text-xs">
                   <Link href="/privacy" className="font-bold underline">Privacy Policy</Link>
               </div>
               <p className="my-2 text-xs">&#169;2021 Kaho Shibuya</p>
           </footer>
       );
}