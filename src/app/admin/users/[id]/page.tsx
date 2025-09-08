import UserDetailClient from "./UserDetailClient";


export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ unwrap params safely on server
  const userId = (await params).id;

  // pass id down to client
  return <UserDetailClient id={userId} />;
}
