import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { OnDestroy, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl:'./product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy{

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean=true;
    filteredProducts: IProduct[] = [];
    products : IProduct[] =[];
    errorMessage = '';
    sub!:Subscription;

    constructor(private productService : ProductService){

    }

    private _listFilter: string ='';
    get listFilter():string{
      return this._listFilter;
    }

    set listFilter(value: string){
      this._listFilter = value;
      console.log('In setter:', value)
      this.filteredProducts = this.performFilter(value);
    }

    performFilter(filterBy: string): IProduct[]{
      filterBy = filterBy.toLocaleLowerCase();

      return this.products.filter(
        (product: IProduct)=> product.productName.toLocaleLowerCase().includes(filterBy)
        );
    }

    toogleImage():void{
      this.showImage=!this.showImage;
    }

    onRatingClicked(message: string) :void{
      this.pageTitle = 'Product List: ' + message;
    }

    ngOnInit(): void {
      
      this.sub = this.productService.getProducts().subscribe({
        next: products => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error: err => this.errorMessage = err
      });
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }
}