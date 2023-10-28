import TeamSwitcher from "@/components/team-switcher";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Search } from "@/components/search";
import { UserNav } from "@/components/user-nav";

const Navbar = () => {
  return (
    <div className="bg-primary">
      <div className="container flex items-center px-4 py-3">
        <TeamSwitcher />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
