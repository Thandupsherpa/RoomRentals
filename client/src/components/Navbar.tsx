import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/themeProvider";
import { LogOut, Moon, SunMedium, UserPen } from "lucide-react";
import { useUser } from "@/contexts/userprovider";

function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useUser();

  return (
    <nav className="bg-neutral-primary  w-full  top-0">
      <div className="max-w-7xl flex items-center justify-between mx-auto p-4 relative">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-7 w-auto object-contain rounded"
          />
          <span className="text-xl font-semibold text-heading">Roomly</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <NavLink
            to="/"
            className="text-sm font-medium text-fg-brand p-2 hover:bg-accent rounded hover:text-primary"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="text-sm font-medium hover:text-fg-brand p-2 hover:bg-accent rounded hover:text-primary"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="text-sm font-medium hover:text-fg-brand p-2 hover:bg-accent rounded hover:text-primary"
          >
            Contact
          </NavLink>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-md hover:bg-accent"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <SunMedium className="w-5 h-5" />
            )}
          </button>

          {user ? (
            <>
              <button
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                  setIsMenuOpen(false);
                }}
                className="flex text-sm rounded-full"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="/profile.jpg"
                  alt="user"
                />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-4 top-14 w-44 bg-neutral-primary-medium border border-default-medium rounded shadow-lg">
                  <div className="px-4 py-3 text-sm border-b border-default">
                    <p className="font-medium text-heading">{user?.fullName}</p>
                    <p className="text-body truncate">{user?.email}</p>
                  </div>
                  <ul className="p-2 text-sm">
                    <li>
                      <Link
                        to="/profile"
                        className="block p-2 m-1 w-full hover:bg-accent rounded"
                      >
                        <span className="flex gap-3">
                          <UserPen className="size-5" />
                          Profile
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Button
                        variant={"destructive"}
                        className=" block p-2  m-1 w-full hover:bg-neutral-tertiary rounded"
                      >
                        <span className="flex gap-3">
                          <LogOut />
                          Sign out
                        </span>
                      </Button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}

          {/* Hamburger */}
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsDropdownOpen(false);
            }}
            className="md:hidden p-2 w-10 h-10 rounded hover:bg-neutral-secondary-soft"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-neutral-primary border-t border-default shadow-md md:hidden">
            <ul className="flex flex-col p-4 space-y-2">
              <li>
                <NavLink
                  to="/"
                  className="block py-2 px-3 font-medium text-fg-brand hover:bg-accent rounded"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="block py-2 px-3 hover:text-fg-brand hover:bg-accent rounded"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="block py-2 px-3 hover:text-fg-brand hover:bg-accent rounded"
                >
                  Contact
                </NavLink>
              </li>

              {!user && (
                <div className="flex flex-col gap-2 pt-2">
                  <Button variant="outline" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
