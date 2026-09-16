import ProjectDetailPage, {
  generateStaticParams,
} from "@/app/projects/[slug]/page";

export const revalidate = 3600;

export const metadata = {
  title: "Case Study & Project Outcome | RYZE WORKS",
  description:
    "Detailed client outcomes, technical architecture, deployed services, and verified metrics.",
};

export { generateStaticParams };
export default ProjectDetailPage;
