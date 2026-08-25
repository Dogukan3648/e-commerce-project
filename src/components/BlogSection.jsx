import blogPosts from "../data/blogPosts";
import DesktopBlogCard from "./DesktopBlogCard";
import MobileBlogCard from "./MobileBlogCard";

const BlogSection = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto flex w-full flex-col items-center gap-20 py-20 lg:max-w-263 lg:gap-24">
        <div className="flex w-77 flex-col items-center gap-2.5 text-center">
          <p className="text-sm font-bold leading-6 text-primary">
            Practice Advice
          </p>

          <h2 className="whitespace-nowrap text-[40px] font-bold leading-[50px] text-dark">
            Featured Posts
          </h2>
        </div>

        <div className="flex w-82 flex-col items-center gap-8 lg:w-full lg:flex-row lg:items-start lg:justify-center lg:gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="w-full lg:min-w-0 lg:flex-1">
              <MobileBlogCard post={post} />
              <DesktopBlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
