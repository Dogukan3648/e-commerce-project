import { CalendarDays, ChartArea, ChevronRight } from "lucide-react";

const MobileBlogCard = ({ post }) => {
  return (
    <article className="mx-auto w-82 overflow-hidden bg-white shadow-sm lg:hidden">
      <div className="relative h-75 w-full">
        <img
          src={post.mobileImage}
          alt=""
          className="h-full w-full object-cover"
        />

        <span className="absolute left-5 top-5 rounded-sm bg-[#E74040] px-2.5 text-sm font-bold leading-6 text-white shadow-sm">
          NEW
        </span>
      </div>

      <div className="flex flex-col items-start gap-2.5 px-6 pb-9 pt-6">
        <div className="flex items-center gap-4 text-xs leading-4">
          <span className="text-[#8EC2F2]">Google</span>
          <span className="text-muted">Trending</span>
          <span className="text-muted">New</span>
        </div>

        <h3 className="w-62 text-xl leading-[30px] text-dark">
          Loudest à la Madison #1 (L&apos;integral)
        </h3>

        <p className="w-full text-sm leading-5 text-muted">
          We focus on ergonomics and meeting you where you work. It&apos;s only
          a keystroke away.
        </p>

        <div className="flex w-full items-center justify-between py-4">
          <div className="flex items-center gap-1 text-xs leading-4 text-muted">
            <CalendarDays
              size={16}
              className="text-primary"
              aria-hidden="true"
            />
            <span>22 April 2021</span>
          </div>

          <div className="flex items-center gap-1 text-xs leading-4 text-muted">
            <ChartArea
              size={16}
              className="text-[#23856D]"
              aria-hidden="true"
            />
            <span>10 comments</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-sm font-bold leading-6 text-muted">
          <span>Learn More</span>
          <ChevronRight size={16} className="text-primary" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
};

export default MobileBlogCard;
