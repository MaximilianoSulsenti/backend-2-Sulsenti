import mongoose from "mongoose";
import { env } from "../config/environment.js";

export default class mongoSingleton {
   static #instance;

   constructor(){
      mongoose.connect(env.MONGO_URI);
   }

   static getInstance(){
      if(this.#instance){
         console.log("Ya existe una instancia de MongoDB");
         return this.#instance;
      }

      this.#instance = new mongoSingleton();
      console.log("Se creó una nueva instancia de MongoDB");
      return this.#instance;
   }
}
