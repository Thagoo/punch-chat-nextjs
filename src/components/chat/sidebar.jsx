import Link from "next/link";

export default function Sidebar() {
  return (
    <div>
      <ul>
        <Link href="/chat/1">user 1</Link>
        <Link href="/chat/2">user 2</Link>
      </ul>
    </div>
  );
}
