import * as mainRepository from '../models/main.js';

export async function getPromotionRooms() {
  const promotionList = await mainRepository.readRoomsOfPromotion();
  return promotionList;
}

export async function getRecommendRooms() {
  const recommendList = await mainRepository.readRoomsOfRecommend();
  return recommendList;
}

export function getBannerRooms() {}
