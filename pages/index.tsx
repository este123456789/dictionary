import Head from "next/head";
import React, { useEffect, useState } from "react";

const AudioPlayer: React.FC<{ audioSrc: string }> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div
      onClick={togglePlay}
      className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 cursor-pointer"
    >
      <audio ref={audioRef} src={audioSrc} />
      {isPlaying ? (
        <i className="fa fa-pause text-white text-xl"></i>
      ) : (
        <i className="fa fa-play text-white text-xl"></i>
      )}
    </div>
  );
};

const HomePage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [inputValue, setInputValue] = useState<string>("hello");
  const [loading, setLoading] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Estado para el modo oscuro

  useEffect(() => {
    const fetchData = async () => {
      if (!inputValue) return;

      setLoading(true);
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Cambia el estado de modo oscuro
    document.body.classList.toggle("dark", !isDarkMode); // Agrega o quita la clase 'dark' en el body
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.css"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/flowbite@1.5.3/dist/flowbite.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@1.23.2/dist/full.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/custom.css" />
      </Head>
      <header className="fixed w-full">
        <nav className="py-2.5 ">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
            <a href="#" className="flex items-center">
              <img src="/img/logo.png" className="h-9 mr-3 sm:h-5" alt="Logo" />
            </a>
            <div className="flex items-center lg:order-2">
              <div className="custom-menu" id="custom-menu">
                Serift <i className="fa fa-angle-down angle-custom"></i>
              </div>
              <div className="checkbox-wrapper-5">
                <div className="check">
                  <input id="check-5" type="checkbox" />
                  <label htmlFor="check-5"></label>
                </div>
              </div>
              <a href="#" id="change-theme-btn" className="darkmode" onClick={toggleDarkMode}>
                <i className={`fa ${isDarkMode ? "fa-sun-o" : "fa-moon-o"}`} aria-hidden="true"></i>
              </a>
              <button
                id="custom-menu__togglebtn"
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 custom-menu__togglebtn"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>

        <div className="keyboard">
          <input
            type="text"
            name="keyboard"
            id="keyboard"
            placeholder="Keyboard"
            onChange={handleInputChange}
            onBlur={handleInputChange}
            value={inputValue}
          />
          <i className="fa fa-search text-primary m-1"></i>
        </div>
        
      </header>
      <main>
        <div className="keyboard result">
          {Array.isArray(data) && data.map((entry: any) => 
            entry.phonetics.map((phonetic: any, phIndex: number) => 
              phonetic.audio && (
                <div key={phIndex} className="absolute top-4 right-4 audio-player">
                  <AudioPlayer audioSrc={phonetic.audio} />
                </div>
              )
            )
          )}
          {loading && <p>Loading...</p>}
          {Array.isArray(data) &&
            data.map((entry: any) => (
              <div key={entry.word}>
                <h2 className="text-xl font-bold title">{entry.word}</h2>
                <ul>
                  {entry.phonetics.map((phonetic: any, phIndex: number) => (
                    <li key={phIndex} className="audio">
                      {phonetic.text && <div className="audio__txt">{phonetic.text} </div>}
                    </li>
                  ))}
                </ul>
                <ul>
                  {entry.meanings.map((meaning: any, index: number) => (
                    <li key={index}>
                      <strong>{meaning.partOfSpeech}:</strong>
                      <ul>
                        {meaning.definitions.map(
                          (definition: any, defIndex: number) => (
                            <li key={defIndex}>{definition.definition}</li>
                          )
                        )}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          {!Array.isArray(data) && !loading && <p>No results found.</p>}
        </div>
      </main>
      <footer></footer>
      <script src="/js/custom.js"></script>
    </>
  );
};

export default HomePage;
