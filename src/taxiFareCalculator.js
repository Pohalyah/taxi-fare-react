/**
 * Calculateur de tarifs de taxi.
 *
 * Règles tarifaires :
 * - Tarif A (1,06 €/km) : Zone urbaine, Lundi-Samedi 10h-17h
 * - Tarif B (1,32 €/km) : Zone urbaine (Lun-Sam 17h-10h, Dim 7h-24h, Jours fériés),
 *                         Zone suburbaine (Lun-Sam 7h-19h)
 * - Tarif C (1,58 €/km) : Zone urbaine (Dim y compris fériés 0h-7h),
 *                         Zone suburbaine (Lun-Sam 19h-7h, Dim y compris fériés 0h-24h),
 *                         Hors zone (toujours)
 * - Prise en charge : 2,60 € pour toutes les courses
 */


/**
 * Utilisation de "Object.freeze()" pour déclarer l'enum.
 * Cette méthode permetant de créer un objet immuable (ne pouvant être modifié).
 */
export const Zone = Object.freeze({
  URBAINE: 'URBAINE',
  SUBURBAINE: 'SUBURBAINE',
  HORS_ZONE: 'HORS_ZONE',
});

export const PRISE_EN_CHARGE = 2.60;
export const TARIF_A = 1.06;
export const TARIF_B = 1.32;
export const TARIF_C = 1.58;

/**
 * Calcule le prix d'une course de taxi.
 *
 * @param {number} jourSemaine - Jour de la semaine (0 = dimanche, 1 = lundi, ..., 6 = samedi)
 * @param {number} hour        - Heure de la course (0-23)
 * @param {string} zone        - Zone de la course (Zone.URBAINE | Zone.SUBURBAINE | Zone.HORS_ZONE)
 * @param {number} distance    - Distance de la course en km
 * @param {boolean} estFerie   - True si la course a lieu un jour férié
 * @returns {number} Le prix total de la course en euros.
 */

export function calculateFare(jourSemaine, hour, zone, distance, estFerie) {
  var tarifUtilise=null;

  switch (zone) {
  case Zone.URBAINE:
      if(jourSemaine===0) {
          if(hour<7){
            tarifUtilise=TARIF_C
          } else {tarifUtilise=TARIF_B}
      } else if (estFerie===true){
        tarifUtilise=TARIF_B
      } else {
        if(hour>=10 && hour<17){
          tarifUtilise=TARIF_A
        } else {
          tarifUtilise=TARIF_B
        }
      }
    break;

  case Zone.SUBURBAINE:
      if(jourSemaine===0 || estFerie ===true){
        tarifUtilise=TARIF_C;
      } else if (hour>=7 && hour<19) {
        tarifUtilise=TARIF_B
      } else {
        tarifUtilise=TARIF_C
        }

    break;

  case Zone.HORS_ZONE:
    tarifUtilise=TARIF_C;
    break;

  default:
    console.log("Erreur dans la course.");
} return (tarifUtilise*distance)+PRISE_EN_CHARGE
  
}
