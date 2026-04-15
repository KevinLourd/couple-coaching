export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
        <p>&copy; {new Date().getFullYear()} Kevin Lourd. All rights reserved.</p>
        <a href="https://kevinlourd.com" className="hover:text-zinc-300 transition-colors">
          kevinlourd.com
        </a>
      </div>
    </footer>
  );
}
