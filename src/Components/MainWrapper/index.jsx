import React, { useEffect, useRef } from "react";
import LoadingOverlay from "react-loading-overlay";
import Header from "./Header";
import Footer from "./Footer";
LoadingOverlay.propTypes = undefined;
function MainWrapper({
  children,
  loading,
  loadingText,
  isInactive,
  hideHeader,
}) {
  const scrolling = useRef();
  useEffect(() => {
    scrolling.current.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col">
      <LoadingOverlay active={loading} spinner text={loadingText}>
        {!hideHeader && <Header />}
        {!hideHeader && <div className="mt-20" />}

        <div ref={scrolling} className="flex flex-1  bg-gray-100 ">
          {isInactive ? (
            <main className="flex min-h-screen items-center justify-center bg-primary font-sans w-full">
              <div
                for="dropzone-file"
                className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-secondary bg-primary p-6 text-center"
              >
                <p className="text-bold">404 ! PAGE NOT FOUND </p>
              </div>
            </main>
          ) : (
            children
          )}
        </div>
        <Footer />
      </LoadingOverlay>
    </div>
  );
}

export default MainWrapper;
