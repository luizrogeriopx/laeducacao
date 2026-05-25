export const WHATSAPP_NUMBER = "5562996592952";

export function whatsappCourseLink(opts: { title: string; url: string }) {
  const msg = `Olá! Tenho interesse em me matricular no curso: ${opts.title} (${opts.url})`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
