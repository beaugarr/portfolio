import { SubPageProps } from "@/utils/types";
import SubPageClient from "@/comps/subPageClient";

// Server component
const SubPage = async ({ params }: SubPageProps) => {
  const { slug } = await params; // Resolve `params` on the server

  return (
      <SubPageClient slug={slug} />
  );
};

export default SubPage;
