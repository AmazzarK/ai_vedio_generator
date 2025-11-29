import { UserButton } from '@clerk/nextjs';

export default function Dashboard() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <UserButton afterSignOutUrl="/" />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
            <p className="text-muted-foreground">
              This is your AI Video Generator dashboard.
            </p>
          </div>

          <div className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Videos</h2>
            <p className="text-muted-foreground">
              Create and manage your AI-generated videos.
            </p>
          </div>

          <div className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Settings</h2>
            <p className="text-muted-foreground">
              Configure your account and preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
