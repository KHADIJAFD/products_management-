import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{

  public productId!:number
  public productFormGroup!:FormGroup
  constructor(private activatedRoute:ActivatedRoute,private productService:ProductService,private fb:FormBuilder) {
  }
  ngOnInit() {
     this.productId=this.activatedRoute.snapshot.params['id'];
     this.productService.etProductById(this.productId).subscribe({
       next: (product)=>{
            this.productFormGroup=this.fb.group({
              id:this.fb.control(product.id),
              name:this.fb.control(product.name,[Validators.required]),
              price:this.fb.control(product.price,[Validators.min(100)]),
              checked:this.fb.control(product.checked),
            })
       },
       error :err => {
         console.log(err)
       }
     });
  }

  updateProduct() {
    let product =this.productFormGroup.value
    this,this.productService.updateProduct(product).subscribe({
      next:data=>{
        alert(JSON.stringify(data));
      }
    });
  }
}
