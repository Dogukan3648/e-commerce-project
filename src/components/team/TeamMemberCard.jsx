const TeamMemberCard = ({ image, role, name, description }) => {
  return (
    <article className="flex w-[230px] flex-col items-center gap-2.5 bg-white px-10 py-8 text-center">
      <img
        src={image}
        alt={name}
        className="size-32 rounded-full object-cover"
      />

      <p className="whitespace-nowrap text-sm font-bold leading-6 tracking-[0.2px] text-primary">
        {role}
      </p>

      <h3 className="text-base font-bold leading-6 tracking-[0.1px] text-dark">
        {name}
      </h3>

      <p className="w-[150px] text-sm font-normal leading-5 tracking-[0.2px] text-muted">
        {description}
      </p>
    </article>
  );
};

export default TeamMemberCard;
