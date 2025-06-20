import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();

  // On initialise un index d'affichage à 0
  const [index, setIndex] = useState(0);

  // Sécurité : on clone les données avant tri pour éviter de modifier l'original
  const byDateAsc = data?.focus
    ? [...data.focus].sort(
        (a, b) => new Date(a.date) - new Date(b.date) // ordre du plus ancien au plus récent
      )
    : [];

  // Gestion du défilement automatique toutes les 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex < byDateAsc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    // Nettoyage à chaque re-render pour éviter les images blanches et les boucles infinies
    return () => clearTimeout(timer);
  }, [index, byDateAsc.length]);

  // Si les données ne sont pas encore prêtes, on ne retourne rien
  if (!byDateAsc.length) return null;

  return (
    <div className="SlideCardList">
      {/* Affichage d’une seule carte à la fois */}
      {byDateAsc.map((event, idx) => {
        const isVisible = index === idx;

        return (
          <div
key={`slide-${event.id ?? idx}`}

            className={`SlideCard SlideCard--${isVisible ? "display" : "hide"}`}
          >
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateAsc.map((event, idx) => (
            <input
              // clé unique, stable, liée à la donnée
              key={`radio-${event.id ?? idx}`}
              type="radio"
              name="radio-button"
              // idx est le vrai index courant du `map`
              checked={index === idx}
              // readOnly pour éviter les interactions utilisateur
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
