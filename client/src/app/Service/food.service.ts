import { Injectable } from '@angular/core';
import { Food } from '../Common/models/food.model';
import { WebApi } from '../Common/web-api-action';
import { Observable } from 'rxjs';

// Using
// this.fs.getAllFoods().subscribe(
//     res => console.log(res),
//     error => console.log(error),
//   );

@Injectable()
export class FoodService {

    constructor(private apiClient: WebApi) { }

    getAllFoods(): Observable<FoodsResponse> {
        return this.apiClient.get<FoodsResponse>('/api/foods');
    }
}

class FoodsResponse {
    message?: string;
    foods?: Food[];
}
