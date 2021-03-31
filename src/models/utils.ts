export const slugify = (title: String): string => {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]/g, '')
    .replace(/\-{2,}/g, '-')
    .replace(/^-+/g, '')
    .replace(/-+$/g, '');
};
