import { ChevronRight } from "lucide-react";

const DescriptionList = ({ title, items }) => {
  return (
    <div className="flex w-83 flex-col gap-7.5">
      <h3 className="text-2xl font-bold leading-8 tracking-[0.1px] text-dark">
        {title}
      </h3>

      <div className="flex flex-col gap-2.5">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <ChevronRight size={16} className="shrink-0 text-muted" />

            <p className="text-sm font-bold leading-6 tracking-[0.2px] text-muted">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DescriptionList;
