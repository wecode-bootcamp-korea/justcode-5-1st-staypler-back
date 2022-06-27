import * as mainRepository from '../models/main.js';

export async function getPromotionRooms() {
  const promotionList = await mainRepository.readRoomsOfPromotion();
  return promotionList;
}

export function getRecommendRooms() {}

export function getBannerRooms() {}
