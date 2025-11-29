import { HealthForm } from '@/components/health-form';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="mb-8 text-center"></div>
            <HealthForm />
        </main>
    );
}
