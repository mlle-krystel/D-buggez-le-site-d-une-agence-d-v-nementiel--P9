// Fichier : src/containers/Events/EventList.jsx

import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Correction : filtrage et pagination sécurisés même si data est null
  const filteredEvents = (
    data?.events?.filter((event) => {
      if (!type) return true;
      return event.type === type;
    }) || []
  ).slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  const totalFiltered = data?.events?.filter((event) => !type || event.type === type) || [];
  const pageNumber = Math.ceil(totalFiltered.length / PER_PAGE);

  const typeList = new Set(data?.events?.map((event) => event.type));

  return (
    <>
      {error && <div>An error occurred</div>}
      {!data ? (
        "Loading..."
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />

          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>

          <div className="Pagination">
  {[...Array(pageNumber || 0)].map((_, n) => {
    const pageKey = `page-${n + 1}`;
    return (
      <a key={pageKey} href="#events" onClick={() => setCurrentPage(n + 1)}>
        {n + 1}
      </a>
    );
  })}
</div>

        </>
      )}
    </>
  );
};

export default EventList;
