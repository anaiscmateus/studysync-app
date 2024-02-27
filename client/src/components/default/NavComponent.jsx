// NavComponent.jsx
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
} from "@nextui-org/react";

export default function NavComponent({ handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <Link href="/dashboard">
          <NavbarBrand className="flex gap-2 items-center">
            <img width={30} src="/assets/icons/sync.png" />
            <p className="font-bold text-xl text-black">StudySync</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button className="hidden md:block" color="danger" onPress={handleLogout}>
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
          <NavbarMenuItem >
            <Link color="danger" onClick={handleLogout}>
              <span>Log Out</span>
            </Link>
          </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
