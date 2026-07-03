import type { Restaurant } from "../models/Resturant.js";

//Singleton Pattern
class RestaurantManager {
  private static instace: RestaurantManager;

  private restaurantsByLocation: Map<string, Restaurant[]> = new Map();
  private constructor() {}

  static getInstance(): RestaurantManager {
    if (!RestaurantManager.instace) {
      RestaurantManager.instace = new RestaurantManager();
    }
    return RestaurantManager.instace;
  }

  addRestaurant(restaurant: Restaurant): void {
    const loc = restaurant.getAddress();
    if (!this.restaurantsByLocation.has(loc)) {
      this.restaurantsByLocation.set(loc, []);
    }
    this.restaurantsByLocation.get(loc)!.push(restaurant);
  }

  searchByLocation(loc: string): Restaurant[] {
    return this.restaurantsByLocation.get(loc) ?? [];
  }
}

const manger = RestaurantManager.getInstance();
