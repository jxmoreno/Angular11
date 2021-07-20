import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product Detail';
  imageWidth: number = 200;
  imageMargin: number = 2;
  product:IProduct | undefined;
  sub !: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.sub = this.productService.getProducts().subscribe({
      next: productFiltered => this.product = productFiltered.find(x=> x.productId== id),
      
    }   
    )
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  onBack(): void{
    this.router.navigate(['/products']);
  }

}
