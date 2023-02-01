import { Welcome } from '@/components/Welcome/Welcome';
import { Container } from '@mantine/core';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Container>
        <Welcome />
        <main className={inter.className}>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores repellat dolor
            harum quidem voluptatem totam veritatis consequatur temporibus? Nemo enim aut eveniet
            adipisci vero! Nemo voluptas facere voluptatibus odio illum?
          </p>
        </main>
      </Container>
    </>
  );
}
