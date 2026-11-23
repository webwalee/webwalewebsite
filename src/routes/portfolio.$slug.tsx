import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProjectShowcase } from "@/components/agency";
import { findProject } from "@/lib/portfolio";

export const Route = createFileRoute("/portfolio/$slug")({
  beforeLoad: ({ params }) => {
    const project = findProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ params }) => {
    const project = findProject(params.slug);
    const title = project ? `${project.name} — Fictional demo project | WEBWALE` : "Portfolio demo | WEBWALE";
    const description = project
      ? `${project.shortDescription} An original, fictional ${project.category.toLowerCase()} website concept created by WEBWALE.`
      : "Explore a fictional business website concept from WEBWALE Studio.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectRoute,
});

function ProjectRoute() {
  const { project } = Route.useRouteContext();
  return <ProjectShowcase project={project} />;
}