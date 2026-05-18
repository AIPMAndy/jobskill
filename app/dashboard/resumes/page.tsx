'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, Star, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Resume {
  id: number;
  name: string;
  content: string;
  file_path: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export default function ResumesPage() {
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await fetch('/api/resumes');
      const data = await response.json();
      setResumes(data.resumes);
    } catch (error) {
      toast.error('Failed to load resumes');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      const response = await fetch(`/api/resumes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'set_default' }),
      });

      if (!response.ok) throw new Error('Failed to set default');

      toast.success('Default resume updated');
      fetchResumes();
    } catch (error) {
      toast.error('Failed to set default resume');
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;

    try {
      const response = await fetch(`/api/resumes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      toast.success('Resume deleted');
      fetchResumes();
    } catch (error) {
      toast.error('Failed to delete resume');
      console.error(error);
    }
  };

  const getWordCount = (content: string) => {
    return content.trim().split(/\s+/).length;
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading resumes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resumes</h1>
          <p className="text-gray-600 mt-1">Manage your resume versions</p>
        </div>
        <Button onClick={() => router.push('/dashboard/resumes/new')}>
          <Plus className="w-4 h-4 mr-2" />
          New Resume
        </Button>
      </div>

      {resumes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No resumes yet</h3>
            <p className="text-gray-600 mb-4">Create your first resume to get started</p>
            <Button onClick={() => router.push('/dashboard/resumes/new')}>
              <Plus className="w-4 h-4 mr-2" />
              Create Resume
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <Card key={resume.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {resume.name}
                      {resume.is_default && (
                        <Badge variant="default" className="ml-2">
                          <Star className="w-3 h-3 mr-1" />
                          Default
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {getWordCount(resume.content)} words
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <p>Created: {new Date(resume.created_at).toLocaleDateString()}</p>
                    <p>Updated: {new Date(resume.updated_at).toLocaleDateString()}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => router.push(`/dashboard/resumes/${resume.id}`)}
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    {!resume.is_default && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(resume.id)}
                      >
                        <Star className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(resume.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
