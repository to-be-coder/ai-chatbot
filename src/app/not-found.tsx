import { Button, Container, Group, Text, Title, rem } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

function NotFoundPage() {
  return (
    <Container size="xl" mt={rem(200)} mb={rem(100)}>
      <Title ta="center">Error: 404 Nothing to see here</Title>
      <Text ta="center">
        You may have mistyped the address, or the page has been moved to another
        URL.
      </Text>

      <Group justify="center" mt="xl">
        <Button
          variant="main"
          radius="md"
          size="md"
          rightSection={<IconArrowRight size={14} />}
          component={Link}
          href="/"
        >
          Back to Home
        </Button>
      </Group>
    </Container>
  );
}

export default NotFoundPage;
