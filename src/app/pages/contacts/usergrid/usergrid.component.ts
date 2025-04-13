import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/service/user.service';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usergrid',
  templateUrl: './usergrid.component.html',
  styleUrls: ['./usergrid.component.scss'],
  standalone:true,
  imports:[CommonModule,PagetitleComponent]
})

/**
 * Contacts user grid component
 */
export class UsergridComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  modalRef?: BsModalRef;

  selected: any;
  userForm: UntypedFormGroup;
  submitted = false;
  items: UntypedFormArray;
  // Select2 Dropdown
  selectValue: string[];
  UserGrid: any
  constructor(private modalService: BsModalService, private formBuilder: UntypedFormBuilder,private router:Router ,public store: Store,private userService:UserService,private http:HttpClient) { }

  ngOnInit() {
    this.selectValue = ['Photoshop', 'illustrator', 'Html', 'Css', 'Php', 'Java', 'Python'];

    this.breadCrumbItems = [{ label: 'Users' }, { label: 'Users Grid', active: true }];
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      designation: ['', [Validators.required]]
    });
    
    /*this.store.dispatch(fetchuserGridData());
    this.store.select(selectData).subscribe(data => {
      this.UserGrid = data
    })*/
    this.userService.getAllUsers().subscribe(data=>{
      this.UserGrid=data
    })
    
  }

  get form() {
    return this.userForm.controls;
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }
  navigate(id:string){
    this.router.navigateByUrl('/contacts/profile/'+id);
  }

remove(event: any,id:number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete the user!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'the user  has been deleted.',
            'success'
          );
          event.target.closest('.card')?.remove();
          console.log(id);
          this.userService.deleteUser(id).subscribe(  response => console.log('Success:', response),
          error => console.error('Error:', error))
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your User is still persisted :)',
            'error'
          );
        }
      });
  }



  /**
   * Save user
   */
  // saveUser() {
  //   if (this.userForm.valid) {
  //     const name = this.userForm.get('name').value;
  //     const email = this.userForm.get('email').value;
  //     const designation = this.userForm.get('designation').value;
  //     this.userGridData.push({
  //       id: this.userGridData.length + 1,
  //       name,
  //       email,
  //       designation,
  //       projects: this.selected
  //     })
  //     this.modalService.hide()
  //   }
  //   this.submitted = true
  // }
}