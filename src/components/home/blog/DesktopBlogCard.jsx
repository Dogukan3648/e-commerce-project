import {
  CalendarDays,
  ChartArea,
  ChartNoAxesCombined,
  ChevronRight,
  Download,
  Eye,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";

const DesktopBlogCard = ({ post }) => {
  return (
    <article className="hidden h-101 w-full overflow-hidden bg-white lg:flex">
      <div className="relative h-full w-5/12 shrink-0">
        <img
          src={post.desktopImage}
          alt=""
          className="h-full w-full object-cover"
        />

        <span className="absolute left-5 top-5 rounded-sm bg-[#E74040] px-2.5 text-sm font-bold leading-6 text-white shadow-sm">
          Sale
        </span>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-full bg-white text-dark">
            <Heart size={20} aria-hidden="true" />
          </span>

          <span className="flex size-10 items-center justify-center rounded-full bg-white text-dark">
            <ShoppingCart size={20} aria-hidden="true" />
          </span>

          <span className="flex size-10 items-center justify-center rounded-full bg-white text-dark">
            <Eye size={20} aria-hidden="true" />
          </span>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start gap-2.5 px-6 pb-9 pt-6">
        <div className="flex w-full items-center justify-between gap-2">
          <p className="text-sm font-bold leading-6 text-primary">
            English Department
          </p>

          <div className="flex shrink-0 items-center gap-1 rounded-full bg-dark p-1 text-xs leading-4 text-white">
            <Star
              size={16}
              className="fill-[#FFCE31] text-[#FFCE31]"
              aria-hidden="true"
            />
            <span>4.9</span>
          </div>
        </div>

        <h3 className="text-base font-bold leading-6 text-dark">
          Graphic Design
        </h3>

        <p className="text-sm leading-5 text-muted">
          We focus on ergonomics and meeting you where you work. It&apos;s only
          a keystroke away.
        </p>

        <div className="flex items-center gap-2.5 text-sm font-bold leading-6 text-muted">
          <Download size={16} aria-hidden="true" />
          <span>15 Sales</span>
        </div>

        <div className="flex items-center gap-1 px-1 py-1 text-base font-bold leading-6">
          <span className="text-[#BDBDBD]">$16.48</span>
          <span className="text-[#23856D]">$6.48</span>
        </div>

        <div className="flex items-center gap-2" aria-label="Available colors">
          <span className="size-4 rounded-full bg-primary" />
          <span className="size-4 rounded-full bg-[#23856D]" />
          <span className="size-4 rounded-full bg-[#E77C40]" />
          <span className="size-4 rounded-full bg-dark" />
        </div>

        <div className="flex w-full items-center justify-between py-4 text-xs leading-4 text-muted">
          <div className="flex items-center gap-1">
            <CalendarDays
              size={16}
              className="text-primary"
              aria-hidden="true"
            />
            <span>22h...</span>
          </div>

          <div className="flex items-center gap-1">
            <ChartNoAxesCombined
              size={16}
              className="text-[#E77C40]"
              aria-hidden="true"
            />
            <span>64 Lessons</span>
          </div>

          <div className="flex items-center gap-1">
            <ChartArea
              size={16}
              className="text-[#23856D]"
              aria-hidden="true"
            />
            <span>Progress</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5 rounded-full border border-primary px-5 py-2.5 text-sm font-bold leading-6 text-primary">
          <span>Learn More</span>
          <ChevronRight size={16} aria-hidden="true" />
        </div>
      </div>
    </article>
  );
};

export default DesktopBlogCard;
