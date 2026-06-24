// Mirrors Utilities/ChronicleHeader.swift — the white "CHRONICLE" wordmark
// (semibold, wide kerning) that the real app stamps on every screen via
// .chronicleHeader(). Background uses the editorial primary blue.

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-primary-blue">
      <div className="mx-auto max-w-md px-5 py-3">
        <span
          className="text-[15px] font-semibold text-white"
          style={{ letterSpacing: "1.6px" }}
        >
          CHRONICLE
        </span>
      </div>
    </header>
  );
}
