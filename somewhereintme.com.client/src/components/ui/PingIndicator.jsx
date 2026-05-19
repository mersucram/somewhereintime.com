import { useEffect, useState } from "react";

function formatTime(date) {
  return date.toLocaleTimeString();
}

export default function PingIndicator() {
  const [online, setOnline] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function check() {
      try {
        const res = await fetch("/Menu/ping");
        if (mounted) setOnline(res.ok);
      } catch {
        if (mounted) setOnline(false);
      }

      if (mounted) setLastChecked(new Date());
    }

    check();

    // Poll every 30s
    const id = setInterval(check, 30000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  return (
    <div className="relative group inline-flex items-center">
      <div className="flex items-center gap-2">
        <span
          className={`h-2.5 w-2.5 rounded-full ${online ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}
          aria-hidden="true"
        />
        <span className="sr-only">{online ? 'Server online' : 'Server offline'}</span>
      </div>

      <div className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-stone-900/95 px-2 py-1 text-xs text-stone-100 shadow-lg group-hover:block">
        <div>{online ? 'Server: online' : 'Server: offline'}</div>
        <div className="mt-0.5 text-[10px] text-stone-300">Last checked: {lastChecked ? formatTime(lastChecked) : '—'}</div>
      </div>
    </div>
  );
}
