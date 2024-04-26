import { Products } from 'src/app/shared/interface/products';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: Products[], term: string): Products[] {
   return products.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );

  }
}
