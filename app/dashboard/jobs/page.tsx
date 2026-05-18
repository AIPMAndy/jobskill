'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Briefcase, ExternalLink, Sparkles, Trash2, Filter } from 'lucide-react';
import { toast } from 'sonner';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string | null;
  url: string | null;
  description: string | null;
  salary_range: string | null;
  job_type: string | null;
  status: string;
  evaluation_score: number | null;
  evaluation_summary: string | null;
  created_at: string;
  updated_at: string;
}

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [evaluatingId, setEvaluatingId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    url: '',
    description: '',
    salary_range: '',
    job_type: '',
  });

  useEffect(() => {
    fetchJobs();
  }, [filterStatus]);

  const fetchJobs = async () => {
    try {
      const params = new URLSearchParams();
      if (filterStatus !== 'all') {
        params.append('status', filterStatus);
      }

      const response = await fetch(`/api/jobs?${params}`);
      const data = await response.json();
      setJobs(data.jobs);
    } catch (error) {
      toast.error('Failed to load jobs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create job');

      toast.success('Job added successfully');
      setIsAddDialogOpen(false);
      setFormData({
        title: '',
        company: '',
        location: '',
        url: '',
        description: '',
        salary_range: '',
        job_type: '',
      });
      fetchJobs();
    } catch (error) {
      toast.error('Failed to add job');
      console.error(error);
    }
  };

  const handleEvaluate = async (jobId: number) => {
    setEvaluatingId(jobId);

    try {
      const response = await fetch(`/api/jobs/${jobId}/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (!response.ok) throw new Error('Failed to evaluate job');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('No response body');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));

            if (data.done) {
              toast.success(`Evaluation complete! Score: ${data.result.score}/100`);
              fetchJobs();
            } else if (data.error) {
              toast.error(data.error);
            }
          }
        }
      }
    } catch (error) {
      toast.error('Failed to evaluate job');
      console.error(error);
    } finally {
      setEvaluatingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      toast.success('Job deleted');
      fetchJobs();
    } catch (error) {
      toast.error('Failed to delete job');
      console.error(error);
    }
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return 'bg-gray-100 text-gray-800';
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      new: 'bg-blue-100 text-blue-800',
      evaluated: 'bg-purple-100 text-purple-800',
      applied: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return variants[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>
          <p className="text-gray-600 mt-1">Track and evaluate job opportunities</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Job</DialogTitle>
              <DialogDescription>Enter the job details to track this opportunity</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddJob} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="salary_range">Salary Range</Label>
                  <Input
                    id="salary_range"
                    placeholder="e.g., $100k - $150k"
                    value={formData.salary_range}
                    onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="url">Job URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://..."
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="job_type">Job Type</Label>
                <Input
                  id="job_type"
                  placeholder="e.g., Full-time, Remote"
                  value={formData.job_type}
                  onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="Paste the job description here..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Job</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 flex gap-2">
        <Button
          variant={filterStatus === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterStatus('all')}
        >
          All
        </Button>
        <Button
          variant={filterStatus === 'new' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterStatus('new')}
        >
          New
        </Button>
        <Button
          variant={filterStatus === 'evaluated' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterStatus('evaluated')}
        >
          Evaluated
        </Button>
        <Button
          variant={filterStatus === 'applied' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterStatus('applied')}
        >
          Applied
        </Button>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Briefcase className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs yet</h3>
            <p className="text-gray-600 mb-4">Add your first job to start tracking opportunities</p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Job
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <Badge className={getStatusBadge(job.status)}>{job.status}</Badge>
                      {job.evaluation_score !== null && (
                        <Badge className={getScoreColor(job.evaluation_score)}>
                          {job.evaluation_score}/100
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-base">
                      {job.company}
                      {job.location && ` • ${job.location}`}
                      {job.salary_range && ` • ${job.salary_range}`}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {job.url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={job.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEvaluate(job.id)}
                      disabled={evaluatingId === job.id}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {evaluatingId === job.id ? 'Evaluating...' : 'Evaluate'}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(job.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {job.evaluation_summary && (
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">AI Evaluation</h4>
                    <p className="text-sm text-gray-600">{job.evaluation_summary}</p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
