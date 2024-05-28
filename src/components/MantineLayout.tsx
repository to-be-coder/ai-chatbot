"use client";

import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import ContextProviders from "./ContextProviders";
import { MantineNav } from "./MantineNav";

export type MantineAppShellProps = {
  children: ReactNode;
};

export default function MantineAppShell({ children }: MantineAppShellProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <ContextProviders>
      <AppShell
        navbar={{
          width: 100,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        {/* <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div>Logo</div>
        </AppShell.Header> */}

        <AppShell.Navbar p="md">
          <MantineNav />
        </AppShell.Navbar>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </ContextProviders>
  );
}
