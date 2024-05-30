import { Card, Stack, Text, Title, rem } from "@mantine/core";
import Link from "next/link";

type Props = {
  title: string;
  text: string;
  link: string;
};

export default function ProjectCard({ title, text, link }: Props) {
  return (
    <Card
      component={Link}
      href={link || ""}
      target="_blank"
      radius="md"
      shadow="xl"
      w={{
        base: "100%",
        md: rem(300),
      }}
      h={rem(300)}
      mx="auto"
      p="lg"
      style={{
        position: "relative",
        justifyContent: "center",
      }}
    >
      <Stack justify="center" align="center" gap="lg">
        <Stack justify="center" align="center" gap={rem(0.5)}>
          <Title c="dark.9" order={2}>
            {title}
          </Title>
          <Text fw={500} fz="1rem" ta="center">
            {text}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
}
