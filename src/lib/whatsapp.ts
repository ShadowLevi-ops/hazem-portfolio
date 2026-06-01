export const WHATSAPP_NUMBER = '60173767247';

export const CONTACT_WHATSAPP_MESSAGE =
  "Hey — I've got a launch coming up and need campaign film + social cutdowns. Can we talk?";

export const QUICK_WHATSAPP_MESSAGE =
  "Hey — I've got something launching soon and wanted to check GiltMedia's availability.";

export type ProjectBriefFields = {
  name: string;
  brand: string;
  budget: string;
  timeline: string;
  brief: string;
};

export function buildProjectBriefMessage(fields: ProjectBriefFields): string {
  return [
    "Hey — here's a project brief for GiltMedia.",
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
