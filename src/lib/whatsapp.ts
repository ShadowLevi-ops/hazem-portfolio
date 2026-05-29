export const WHATSAPP_NUMBER = '60173767247';

export type ProjectBriefFields = {
  name: string;
  brand: string;
  budget: string;
  timeline: string;
  brief: string;
};

export function buildProjectBriefMessage(fields: ProjectBriefFields): string {
  return [
    "Hi Hazem, I'd like to discuss a new project.",
    '',
    `Name: ${fields.name}`,
    `Brand: ${fields.brand}`,
    `Budget: ${fields.budget}`,
    `Timeline: ${fields.timeline}`,
    '',
    'Project brief:',
    fields.brief,
  ].join('\n');
}

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
