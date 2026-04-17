export type UserRole = 'super_admin' | 'tpo_admin' | 'hod_admin' | 'admin' | 'staff' | 'student';
export type Branch = 'CSE' | 'Civil' | 'Mechanical' | 'EE' | 'ECE' | 'All';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branch?: Branch;
  created_at: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  branch?: Branch;
  role?: UserRole | 'All';
  is_scheduled: boolean;
  scheduled_for?: string;
  created_at: string;
  created_by: string;
  attachment_url?: string;
  attachment_type?: 'pdf' | 'photo' | 'link';
}

export interface Profile {
  id: string;
  name: string;
  designation: 'HOD' | 'TPO_HEAD';
  branch: Branch;
  image_url?: string;
  bio?: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  branch?: Branch;
  image_url?: string;
  student_name: string;
  batch: string;
  date: string;
}

export interface ContentSection {
  id: string;
  section_name: string;
  title: string;
  content: string; // JSON or Markdown
  image_url?: string;
  updated_at: string;
}
