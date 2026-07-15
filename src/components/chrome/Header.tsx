import { useEffect, useState } from "react";
import { Eyebrow } from "../ui/Eyebrow";

function formatSFTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Los_Angeles",
  }).format(new Date());
}

function useSFTime() {
  const [time, setTime] = useState(formatSFTime);

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatSFTime()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

export function Header() {
  const time = useSFTime();

  return (
    <header className="fixed inset-x-0 top-0 z-50 edge border-b border-line/60 bg-paper/85 py-5 backdrop-blur-md">
      <div className="wrap flex items-center justify-between">
        <a href="#top" className="font-display-face text-lg text-ink" data-cursor="Top">
          Kossi Houessou<span className="text-accent">.</span>
        </a>

        <div className="flex items-center gap-6">
          <Eyebrow rule={false} className="hidden sm:inline-flex">
            SF · {time}
          </Eyebrow>
          <a href="#contact" data-cursor="Say hi" className="eyebrow underline-draw">
            Say hi ↗
          </a>
        </div>
      </div>
    </header>
  );
}
