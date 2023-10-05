import Container from "@/components/Container";
import Scheduler from "@/components/Scheduler";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <Container>
        <h1 className="text-5xl text-center font-extrabold leading-tight tracking-tighter mb-8 text-muted">
          Scheduler
        </h1>
        <Scheduler />
      </Container>
    </main>
  );
}
