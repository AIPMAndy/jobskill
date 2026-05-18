import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Briefcase, TrendingUp } from "lucide-react";
import Link from "next/link";
import { getJobStats } from "@/lib/db/jobs";
import { getApplicationStats } from "@/lib/db/applications";
import { getAllResumes } from "@/lib/db/resumes";

export default async function DashboardPage() {
  const jobStats = getJobStats();
  const appStats = getApplicationStats();
  const resumes = getAllResumes();

  const interviewCount = appStats.interview || 0;
  const successRate = appStats.total > 0
    ? Math.round(((appStats.offer || 0) / appStats.total) * 100)
    : 0;

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
          value={appStats.total.toString()}
          icon={<FileText className="w-5 h-5 text-blue-600" />}
        />
        <StatCard
          title="Jobs Tracked"
          value={jobStats.total.toString()}
          icon={<Briefcase className="w-5 h-5 text-yellow-600" />}
        />
        <StatCard
          title="Active Interviews"
          value={interviewCount.toString()}
          icon={<TrendingUp className="w-5 h-5 text-green-600" />}
        />
        <StatCard
          title="Success Rate"
          value={`${successRate}%`}
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
            <Button asChild className="gap-2">
              <Link href="/dashboard/jobs">
                <Plus className="w-4 h-4" />
                Add New Job
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/dashboard/resumes/new">
                <FileText className="w-4 h-4" />
                Create Resume
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/dashboard/applications">
                <Briefcase className="w-4 h-4" />
                View Applications
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Evaluation Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Jobs</span>
                <span className="font-semibold">{jobStats.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Evaluated</span>
                <span className="font-semibold">{jobStats.evaluated}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">High Score (80+)</span>
                <span className="font-semibold">{jobStats.highScore}</span>
              </div>
              {jobStats.avgScore && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Score</span>
                  <span className="font-semibold">{jobStats.avgScore}/100</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Applied</span>
                <span className="font-semibold">{appStats.applied || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Screening</span>
                <span className="font-semibold">{appStats.screening || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Interview</span>
                <span className="font-semibold">{appStats.interview || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Offers</span>
                <span className="font-semibold">{appStats.offer || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Rejected</span>
                <span className="font-semibold">{appStats.rejected || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
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
