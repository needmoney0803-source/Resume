import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { id } = req.query;
      if (id) {
        const { data, error } = await supabase
          .from('resumes')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        return res.status(200).json(data);
      }
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .order('updated_at', { ascending: false });
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { title, template, accent_color, personal_info, summary, experience, education, skills, projects, certifications, languages, references_data } = req.body;
      const { data, error } = await supabase
        .from('resumes')
        .insert({
          title: title || 'My Resume',
          template: template || 'classic',
          accent_color: accent_color || '#1e3a5f',
          personal_info: personal_info || {},
          summary: summary || '',
          experience: experience || [],
          education: education || [],
          skills: skills || [],
          projects: projects || [],
          certifications: certifications || [],
          languages: languages || [],
          references_data: references_data || [],
        })
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;
      if (!id) return res.status(400).json({ error: 'Resume ID is required' });
      const updateData = {};
      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.template !== undefined) updateData.template = updates.template;
      if (updates.accent_color !== undefined) updateData.accent_color = updates.accent_color;
      if (updates.personal_info !== undefined) updateData.personal_info = updates.personal_info;
      if (updates.summary !== undefined) updateData.summary = updates.summary;
      if (updates.experience !== undefined) updateData.experience = updates.experience;
      if (updates.education !== undefined) updateData.education = updates.education;
      if (updates.skills !== undefined) updateData.skills = updates.skills;
      if (updates.projects !== undefined) updateData.projects = updates.projects;
      if (updates.certifications !== undefined) updateData.certifications = updates.certifications;
      if (updates.languages !== undefined) updateData.languages = updates.languages;
      if (updates.references_data !== undefined) updateData.references_data = updates.references_data;
      updateData.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('resumes')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: 'Resume ID is required' });
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
