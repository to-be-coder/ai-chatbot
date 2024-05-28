// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import MantineLayout from "@/components/MantineLayout";
import { ColorSchemeScript } from "@mantine/core";

export const metadata = {
  title: "My AI app",
  description: "My AI app that is built in public",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineLayout>{children}</MantineLayout>
      </body>
    </html>
  );
}
