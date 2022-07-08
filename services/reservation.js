import * as roomsImageRepository from '../models/rooms-image.js';
import * as reservationRepository from '../models/reservation.js';

export async function getReservationList({ userId, page, getImageAll, count }) {
  const maxPage = await reservationRepository.readReservationRowCount(userId);
  const data = await reservationRepository.readReservationList(
    userId,
    page,
    count
  );
  if (getImageAll === '1') {
    for (let i = 0; i < data.length; i++) {
      data[i].image = await roomsImageRepository.readAccommodationImages(
        data[i].rooms_id
      );
      data[i].image = data[i].image.map(image => image.image);
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      const image = await roomsImageRepository.readAccommodationImage(
        data[i].rooms_id
      );
      data[i].image = image[0].image;
    }
  }
  return {
    data,
    maxPage: Math.ceil(maxPage[0].cnt / count),
  };
}
