import { createClient } from '@supabase/supabase-js'

const blogSupabaseUrl = import.meta.env.VITE_BLOG_SUPABASE_URL
const blogSupabaseAnonKey = import.meta.env.VITE_BLOG_SUPABASE_ANON_KEY

if (!blogSupabaseUrl || !blogSupabaseAnonKey) {
  throw new Error('Missing Blog Supabase environment variables')
}

export const blogSupabase = createClient(blogSupabaseUrl, blogSupabaseAnonKey)

// ID específico do site (Webplan Enfermeiros)
export const SITE_ID = import.meta.env.VITE_SITE_ID

if (!SITE_ID) {
  throw new Error('SITE_ID não configurado nas variáveis de ambiente')
}

// Blog Types
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image?: string
  featured_image_alt?: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  canonical_url?: string
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  published_at?: string
  reading_time?: number
  views: number
  likes: number
  site_id: string
  author_id: string
  created_at: string
  updated_at: string
}

export interface BlogAuthor {
  id: string
  name: string
  email: string
  bio?: string
  avatar_url?: string
  social_links?: Record<string, string>
  site_id: string
  created_at: string
  updated_at: string
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  active: boolean
  site_id: string
  created_at: string
  updated_at: string
}

export interface BlogTag {
  id: string
  name: string
  slug: string
  color?: string
  active: boolean
  site_id: string
  created_at: string
  updated_at: string
}

export interface BlogPostWithDetails extends BlogPost {
  author: BlogAuthor
  categories: BlogCategory[]
  tags: BlogTag[]
  published_date: Date
  url: string
}
