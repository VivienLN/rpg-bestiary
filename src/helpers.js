export const slugify = input => input.toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')                   // Split accents/letters
    .replace(/[\u0300-\u036f]/g, '')    // Remove accents
    .replace(/\s+/g, '-')               // Replace spaces with -
    .replace(/[^\w\-]+/g, '')           // remove all non-word chars