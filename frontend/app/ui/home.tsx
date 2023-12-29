function Home() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-[90vh] lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
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
              className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-500 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="/chat"
            >
              Join Chat
            </a>

            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
              href="/learn-more"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
