import React, { useEffect, useState } from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { useSelector } from 'react-redux';



const ClientePagination = ( {botonRef, handlePageChange, currentPage, itemShow } 
  :{botonRef: React.RefObject<HTMLDivElement>, handlePageChange: (pageNumber: number) => void, currentPage: number, itemShow: number}) => {

const clientes = useSelector((state) => state.clientes.data)

const totalPages = Math.ceil(clientes.length / itemShow);

  
  const [visibleButtons, setVisibleButtons] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 768) {
        setVisibleButtons(3);
      } else if (windowWidth < 992) {
        setVisibleButtons(5);
      } else {
        setVisibleButtons(7);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  const renderPageButtons = () => {
    const buttons: JSX.Element[] = [];

    let startPage = Math.max(1, currentPage - Math.floor(visibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + visibleButtons - 1);

    if (endPage - startPage < visibleButtons - 1) {
      startPage = Math.max(1, endPage - visibleButtons + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          className={`btn btn-primary ${page === currentPage ? "active" : ""}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      );
    }

    return buttons;
  };
  return (
    <div className="d-flex  gap-1" ref={botonRef} style={{position: 'absolute', bottom: '10px', right: '20px'}}>

    <button
      className="btn btn-primary"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      <MdOutlineNavigateBefore/>
    </button>
  { currentPage > 4 && <button
      className="btn btn-primary"
      onClick={() => handlePageChange(1)}
      disabled={currentPage === 1}
    >
     {1}
    </button> }
    {currentPage > 10 && (
      <button
        className="btn btn-primary"
        onClick={() => handlePageChange(currentPage - 10)}
      >
        {currentPage - 10}
      </button>
    )}
    {renderPageButtons()}
{ currentPage < 18 &&    <button
      className="btn btn-primary"
      onClick={() => handlePageChange(totalPages)}
      disabled={currentPage === totalPages}
    >
      {totalPages}
    </button>}
    <button
      className="btn btn-primary"
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      <MdOutlineNavigateNext/>
    </button>
 
  </div>
  );
};

export default ClientePagination;