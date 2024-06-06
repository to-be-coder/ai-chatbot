"use client";

import {
  Center,
  Image,
  Stack,
  Tooltip,
  UnstyledButton,
  rem,
} from "@mantine/core";

import { IconFilePlus, IconHome2, IconTestPipe } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import classes from "./MantineNav.module.css";

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  url: string;
  onClick?(): void;
}

function NavbarLink({
  icon: Icon,
  label,
  url,
  active,
  onClick,
}: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
        component={Link}
        href={url}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Home", url: "/" },
  { icon: IconFilePlus, label: "Add Note", url: "/add-note" },
  { icon: IconTestPipe, label: "Test", url: "/test" },
  // { icon: IconCalendarStats, label: "Releases", url: "/add-note" },
];

export function MantineNav() {
  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <Image
          src="/favicon.ico"
          h={{ base: rem(35), md: rem(35) }}
          alt="AI Chat Bot"
        />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      {/* <Stack justify="center" gap={0}>
        <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
        <NavbarLink icon={IconLogout} label="Logout" />
      </Stack> */}
    </nav>
  );
}
