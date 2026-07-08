export function AppHeader() {
  return (
    <header
      className="
        sticky
        top-0
        z-50

        border-b
        border-white/10

        bg-white/[0.04]
        backdrop-blur-xl

        shadow-[0_8px_30px_rgba(0,0,0,0.20)]
      "
    >
      <div
        className="
          mx-auto
          flex
          h-16
          max-w-7xl
          items-center
          justify-between
          px-8
        "
      >
        <div
          className="
            text-sm
            font-medium
            text-slate-300
          "
        >
          پنل مدیریت
        </div>

        <div
          className="
            text-lg
            font-bold
            tracking-wide
            text-cyan-300
          "
        >
          ARK Trade Hub
        </div>
      </div>
    </header>
  );
}