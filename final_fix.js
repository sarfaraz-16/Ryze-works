const fs = require('fs');
function replace(file, search, replacement) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.split(search).join(replacement);
  fs.writeFileSync(file, content, 'utf8');
}
replace('app/admin/careers/ApplicationsDeskClient.tsx', 'filter(Boolean)', 'filter((v) => !!v)');
replace('app/admin/leads/LeadsDeskClient.tsx', 'filter(Boolean)', 'filter((v) => !!v)');
replace('app/admin/testimonials/TestimonialModerationClient.tsx', 'filter(Boolean)', 'filter((v) => !!v)');
replace('app/projects/[slug]/page.tsx', 'ps: unknown', 'ps: any');
replace('app/projects/[slug]/page.tsx', 'ps: {}', 'ps: any');
replace('app/projects/[slug]/page.tsx', 's: unknown', 's: any');
replace('app/projects/[slug]/page.tsx', 's: {}', 's: any');
