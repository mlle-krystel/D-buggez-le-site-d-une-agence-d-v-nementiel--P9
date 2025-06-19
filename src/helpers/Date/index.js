// Liste doit commencer par 0 et non à 1 
export const MONTHS = {
  0: "janvier",
  1: "février",
  2: "mars",
  3: "avril",
  4: "mai",
  5: "juin",
  6: "juillet",
  7: "août",
  8: "septembre",
  9: "octobre",
  10: "novembre",
  11: "décembre",
};

// On récupère le mois depuis l'objet MONTHS selon l'index JS soit de 0 à 11
export const getMonth = (date) => MONTHS[date.getMonth()];
