import Link from "next/link";
import { AdminPageHeader } from "@/features/admin/components/admin-page-header";
import { SetupNotice } from "@/features/admin/components/setup-notice";
import { posts } from "@/features/blog/data/posts";

export default function AdminBlogPage() {
  return <><AdminPageHeader eyebrow="Content / Journal" title="Blog" copy={`${posts.length} notes publiées`} /><SetupNotice>L’éditeur de contenu dépendra de PostgreSQL. Les articles actuels restent versionnés et publiés sans risque de perte.</SetupNotice><div className="admin-table-wrap"><table><thead><tr><th>Titre</th><th>Catégorie</th><th>Lecture</th><th>État</th></tr></thead><tbody>{posts.map((post) => <tr key={post.slug}><td><Link href={`/blog/${post.slug}`}>{post.title}</Link></td><td>{post.category}</td><td>{post.readingTime} min</td><td>Publié</td></tr>)}</tbody></table></div></>;
}
