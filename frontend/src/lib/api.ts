const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${endpoint}`;

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    return data;
  } catch {
    return { success: false, error: 'Network error. Please try again.' };
  }
}

export const api = {
  // Leads
  submitLead: (data: Record<string, string>) =>
    request('/leads', { method: 'POST', body: JSON.stringify(data) }),

  // Contact
  submitContact: (data: Record<string, string>) =>
    request('/contacts', { method: 'POST', body: JSON.stringify(data) }),

  // Newsletter
  subscribe: (email: string) =>
    request('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  // Case Studies
  getCaseStudies: (page = 1) =>
    request(`/case-studies?page=${page}`),

  getCaseStudy: (slug: string) =>
    request(`/case-studies/${slug}`),

  getTestimonials: async () => {
    return request('/testimonials');
  },

  // Blog
  getBlogPosts: (page = 1, category?: string) =>
    request(`/blog?page=${page}${category ? `&category=${category}` : ''}`),

  getBlogPost: (slug: string) =>
    request(`/blog/${slug}`),
};
