import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Search, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome back! Here's your job search overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Applications"
          value="0"
          icon={<FileText className="w-5 h-5 text-blue-600" />}
        />
        <StatCard
          title="Pending Evaluations"
          value="0"
          icon={<Search className="w-5 h-5 text-yellow-600" />}
        />
        <StatCard
          title="Active Interviews"
          value="0"
          icon={<TrendingUp className="w-5 h-5 text-green-600" />}
        />
        <StatCard
          title="Success Rate"
          value="0%"
          icon={<TrendingUp className="w-5 h-5 text-purple-600" />}
        />
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Evaluate New Job
            </Button>
            <Button variant="outline" className="gap-2">
              <FileText className="w-4 h-4" />
              Upload Resume
            </Button>
            <Button variant="outline" className="gap-2">
              <Search className="w-4 h-4" />
              Scan Jobs
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <p>No recent activity yet.</p>
            <p className="text-sm mt-2">Start by evaluating your first job posting!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
