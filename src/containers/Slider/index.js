import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Tri chronologique du plus ancien au plus récent
  const byDateAsc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  useEffect(() => {
    // setTimeout renvoie un ID numérique qu'on peut annuler avec clearTimeout
    const timeoutId = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex + 1 === byDateAsc.length ? 0 : prevIndex + 1
      );
    }, 5000);

    // Nettoyage pour éviter plusieurs timers en parallèle
    return () => clearTimeout(timeoutId);
  }, [index, byDateAsc.length]);

  return (
    <div className="SlideCardList">
      {byDateAsc?.map((event, idx) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            {/* Protection contre les images vides */}
            {event.cover && <img src={event.cover} alt={event.title} />}

            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>

          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {/* Slides triées du plus ancien au plus récent */}
              {byDateAsc.map((eventRadio, radioIdx) => (
                <input
                  // id comme key unique donc identifiant de l'événement
                  key={eventRadio.id}
                  type="radio"
                  name="radio-button"
                  // index est la slide actuellement affichée et radioIdx est la position dans la boucle
                  checked={index === radioIdx}
                  // readOnly pour éviter les interactions manuelles
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
