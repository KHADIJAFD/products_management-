import {Component, inject, NgModule, OnInit} from '@angular/core';
import {AsyncPipe, NgClass, NgForOf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf,
    HttpClientModule,
    AsyncPipe,
    FormsModule,
    NgClass
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  // headers.append('Content-Typ
  //private http=inject(HttpClient);
  constructor(private productService: ProductService, private router:Router,public appState: AppStateService) {
  }
  ngOnInit(): void {
    this.searchProducts();
  }

  searchProducts(){
    this.appState.setProductState({
      status:"LOADING"
    })
    this.productService.searchProducts(this.appState.productState.keyword,this.appState.productState.currentPage,this.appState.productState.pageSize)
      .subscribe({
        next: (resp) =>{
          let products=resp.body as Product[]
          let totalProducts=parseInt(resp.headers.get('x-total-count')!)
          this.appState.productState.totalProducts=totalProducts;
          let totalPages=
            Math.floor(totalProducts/this.appState.productState.pageSize);
          if (totalProducts%this.appState.productState.pageSize!=0){
            ++totalPages;
          }
          this.appState.setProductState({
            products:products,
            totalPages:totalPages,
            totalProducts:totalProducts,
            status:"LOADED"

          })
        } ,
        error: error=> {
         this.appState.setProductState({
           status:"ERROR",
           errMssg:error.statusText
         })
        }
      });
   // this.products=this.productService.getProducts();
  }


  handelCheckProduct(product: Product) {
    this.productService.checkProducts(product).subscribe({
     next:updatedProduct=>{
       product.checked=!product.checked;
     }
    })
  }

  handelDelete(product: Product) {
    if (confirm("Etes vous sur de supprimer?"))
    this.productService.deleteProduct(product).subscribe({
      next:value=>{
        //this.getProducts();
        //this.products=this.products.filter((p:any)=>p.id!=product.id);
        this.searchProducts()
      }
    });
  }

  handleGoToPage(page: number) {
    this.appState.productState.currentPage=page;
    this.searchProducts();
  }

  handelEdit(product: Product) {
    this.router.navigateByUrl(`/EditProduct/${product.id}`)
  }
}
