import LoadingSkeleton from "react-loading-skeleton";
import { useLanguage } from "hooks";
import "react-loading-skeleton/dist/skeleton.css";

export default function Skeleton({ className, ...props }) {
  const language = useLanguage();
  return (
    <div className={className}>
      <LoadingSkeleton
        direction={language.direction}
        {...props}
        containerClassName=""
      />
    </div>
  );
}
