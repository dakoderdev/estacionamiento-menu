interface RandomToggleProps {
  toggleEnabled: boolean;
  toggle: () => void;
}

export default function RandomToggle({ toggleEnabled, toggle }: RandomToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={toggleEnabled}
      onClick={toggle}
      className={`absolute top-3 left-3 cursor-pointer border border-neutral-400/20 shadow-md w-12.25 h-fit rounded-full p-1 transition-all ${
        toggleEnabled ? "shadow-white/15" : ""
      }`}
    >
      <div
        className={`w-5 h-5 bg-white flex justify-center items-center rounded-full transition-transform duration-200 ${
          toggleEnabled ? "translate-x-full text-black" : "translate-x-0 text-neutral-500"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="transition-colors"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 4l3 3l-3 3" />
          <path d="M18 20l3 -3l-3 -3" />
          <path d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5" />
          <path d="M3 17h3a5 5 0 0 0 5 -5a5 5 0 0 1 5 -5h5" />
        </svg>
      </div>
    </button>
  );
}