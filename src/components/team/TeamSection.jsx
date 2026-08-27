import teamMembers from "../../data/team/teamMembers";
import TeamMemberCard from "./TeamMemberCard";

const TeamSection = () => {
  return (
    <section className="bg-light-gray">
      <div className="mx-auto flex flex-col items-center gap-15 py-16 lg:w-[1050px] lg:gap-28 lg:py-28">
        <div className="flex w-78 flex-col items-center gap-2.5 text-center lg:w-[864px]">
          <h1 className="text-[40px] font-bold leading-[50px] tracking-[0.2px] text-dark">
            Meet Our <br className="lg:hidden" />
            Team
          </h1>

          <p className="w-75 text-sm font-normal leading-5 tracking-[0.2px] text-muted lg:w-[469px]">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-10">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
