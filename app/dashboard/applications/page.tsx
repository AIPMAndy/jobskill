'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Briefcase, Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface ApplicationWithDetails {
  id: number;
  job_id: number;
  resume_id: number | null;
  status: string;
  applied_date: string | null;
  notes: string | null;
  job_title: string;
  job_company: string;
  resume_name: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_COLUMNS = [
  { id: 'applied', label: 'Applied', icon: Briefcase, color: 'bg-blue-100 text-blue-800' },
  { id: 'screening', label: 'Screening', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
  { id: 'interview', label: 'Interview', icon: Calendar, color: 'bg-purple-100 text-purple-800' },
  { id: 'offer', label: 'Offer', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
  { id: 'rejected', label: 'Rejected', icon: XCircle, color: 'bg-red-100 text-red-800' },
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<ApplicationWithDetails | null>(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications');
      const data = await response.json();
      setApplications(data.applications);
    } catch (error) {
      toast.error('Failed to load applications');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appId: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/applications/${appId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      toast.success('Status updated');
      fetchApplications();
    } catch (error) {
      toast.error('Failed to update status');
      console.error(error);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedApp) return;

    try {
      const response = await fetch(`/api/applications/${selectedApp.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });

      if (!response.ok) throw new Error('Failed to save notes');

      toast.success('Notes saved');
      setSelectedApp(null);
      fetchApplications();
    } catch (error) {
      toast.error('Failed to save notes');
      console.error(error);
    }
  };

  const openNotesDialog = (app: ApplicationWithDetails) => {
    setSelectedApp(app);
    setNotes(app.notes || '');
  };

  const getApplicationsByStatus = (status: string) => {
    return applications.filter((app) => app.status === status);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
        <p className="text-gray-600 mt-1">Track your job application pipeline</p>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Briefcase className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
            <p className="text-gray-600">Start applying to jobs to track them here</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {STATUS_COLUMNS.map((column) => {
            const columnApps = getApplicationsByStatus(column.id);
            const Icon = column.icon;

            return (
              <div key={column.id} className="flex flex-col">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">{column.label}</h3>
                    <Badge variant="secondary" className="ml-auto">
                      {columnApps.length}
                    </Badge>
                  </div>
                  <div className="h-1 rounded-full bg-gray-200">
                    <div className={`h-full rounded-full ${column.color.split(' ')[0]}`} />
                  </div>
                </div>

                <div className="space-y-3 flex-1">
                  {columnApps.map((app) => (
                    <Card
                      key={app.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => openNotesDialog(app)}
                    >
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm font-semibold">{app.job_title}</CardTitle>
                        <p className="text-xs text-gray-600 mt-1">{app.job_company}</p>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="space-y-2">
                          {app.applied_date && (
                            <p className="text-xs text-gray-500">
                              Applied: {new Date(app.applied_date).toLocaleDateString()}
                            </p>
                          )}
                          {app.notes && (
                            <p className="text-xs text-gray-600 line-clamp-2">{app.notes}</p>
                          )}
                          <div className="flex gap-1 flex-wrap">
                            {STATUS_COLUMNS.filter((s) => s.id !== column.id).map((status) => (
                              <Button
                                key={status.id}
                                variant="outline"
                                size="sm"
                                className="text-xs h-6 px-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(app.id, status.id);
                                }}
                              >
                                → {status.label}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedApp?.job_title}</DialogTitle>
            <DialogDescription>{selectedApp?.job_company}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Notes</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                placeholder="Add notes about this application..."
                className="mt-1"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedApp(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveNotes}>Save Notes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
