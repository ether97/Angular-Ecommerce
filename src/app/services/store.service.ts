import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";

const STORE_BASE_URL = "https://fakestoreapi.com";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(
    limit = "12",
    sort = "desc",
    category?: string | undefined
  ): Observable<Array<Product>> {
    console.log(
      `${STORE_BASE_URL}/products${
        category ? "/category/" + category.toLowerCase() : ""
      }?sort=${sort}&limit=${limit}`
    );
    return this.httpClient.get<Array<Product>>(
      `${STORE_BASE_URL}/products${
        category ? "/category/" + category.toLowerCase() : ""
      }?sort=${sort}&limit=${limit}`
    );
  }

  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${STORE_BASE_URL}/products/categories`
    );
  }
}
