import './logo.css';

/** Original FW monogram. Shared asset across the interface and browser icon. */
export default function LogoMark({ className = '' }: { className?: string }) {
  return (
    <img
      className={`logo-mark ${className}`}
      src={`${import.meta.env.BASE_URL}fw-mark.svg`}
      alt=""
      aria-hidden="true"
      width="40"
      height="40"
      draggable="false"
    />
  );
}
