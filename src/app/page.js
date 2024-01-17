import Link from "next/link";

export default function Page() {
  return (
    <main>
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-full lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl text-slate-900">
            Punch Chat
            <strong className="font-extrabold text-blue-600 sm:block">
              {" "}
              Start a Conversion.
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Empowering Connections, One Chat at a Time. Experience Seamless
            Communication in the Digital Realm.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-slate-900 px-12 py-3 text-sm font-medium text-white shadow hover:bg-slate-800focus:outline-none focus:ring active:bg-slate-800 sm:w-auto"
              href="/chat"
            >
              Join Chat
            </a>

            <Link
              className="block w-full rounded px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
              href="/about"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
