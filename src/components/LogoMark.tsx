import './logo.css';

/** Original abstract flow symbol; reusable vector asset for product and marketing. */
export default function LogoMark({ className = '' }: { className?: string }) {
  return (
    <img
      className={`logo-mark ${className}`}
      src={`${import.meta.env.BASE_URL}brand/freelaflow-symbol.svg`}
      alt=""
      aria-hidden="true"
      width="40"
      height="40"
      draggable="false"
    />
  );
}
