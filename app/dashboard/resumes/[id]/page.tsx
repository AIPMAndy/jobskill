'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';

interface Resume {
  id: number;
  name: string;
  content: string;
  file_path: string | null;
  is_default: boolean;
}

export default function ResumeEditorPage() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === 'new';

  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      fetchResume();
    }
  }, [params.id]);

  const fetchResume = async () => {
    try {
      const response = await fetch(`/api/resumes/${params.id}`);
      if (!response.ok) throw new Error('Failed to fetch resume');

      const data = await response.json();
      setName(data.resume.name);
      setContent(data.resume.content);
      setIsDefault(data.resume.is_default);
    } catch (error) {
      toast.error('Failed to load resume');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Please enter a resume name');
      return;
    }
    if (!content.trim()) {
      toast.error('Please enter resume content');
      return;
    }

    setSaving(true);
    try {
      const url = isNew ? '/api/resumes' : `/api/resumes/${params.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, content, is_default: isDefault }),
      });

      if (!response.ok) throw new Error('Failed to save resume');

      toast.success(isNew ? 'Resume created' : 'Resume updated');
      router.push('/dashboard/resumes');
    } catch (error) {
      toast.error('Failed to save resume');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">
              {isNew ? 'New Resume' : 'Edit Resume'}
            </h1>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resume Details</CardTitle>
              <CardDescription>Basic information about this resume</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Resume Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Software Engineer Resume"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_default"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="is_default" className="cursor-pointer">
                  Set as default resume
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resume Content</CardTitle>
              <CardDescription>Write your resume in Markdown format</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="edit" className="w-full">
                <TabsList>
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="edit" className="mt-4">
                  <Textarea
                    placeholder="# Your Name&#10;&#10;## Experience&#10;&#10;### Company Name | Job Title&#10;*Date Range*&#10;&#10;- Achievement 1&#10;- Achievement 2"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[500px] font-mono text-sm"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Supports Markdown formatting. Use # for headings, ** for bold, * for italic, - for lists.
                  </p>
                </TabsContent>

                <TabsContent value="preview" className="mt-4">
                  <div className="border rounded-lg p-6 min-h-[500px] bg-white prose prose-sm max-w-none">
                    {content ? (
                      <div className="whitespace-pre-wrap">{content}</div>
                    ) : (
                      <p className="text-gray-400">No content to preview</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
