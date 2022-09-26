import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import  getProdutos  from '@salesforce/apex/ProdutosController.getProdutos';

export default class produtosList extends LightningElement {
    recordId;
    produtos;
    error;
 
     columns =[
         {label: 'Nome', fieldName: 'Name'},
         {label: 'Código do Produto', fieldName: 'ProductCode'},
         {label: 'Descrição do Produto', fieldName: 'Description'},
         {label: 'Categoria do Produto', fieldName: 'Family'},
     ];
 
     @wire(getProdutos)wiredProdutos({error, data}){
         if(data){
             this.produtos = data;
             this.error = undefined;
             console.log(this.produtos);
         } else if(error){
             this.error = error;
             this.produtos = undefined;
         }
     }

    handleSuccess(event){
        
        this.recordId = event.detail.id;

        const toastEvent = new ShowToastEvent({
            title: 'Parabéns!',
            message: 'Produto adicionado com sucesso!',
            variant: 'success'
        });

        this.dispatchEvent(toastEvent);

        window.location.reload();
        
    }

    handleReset(){
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );

        if(inputFields) {
            inputFields.forEach(field => {
                field.value=null;
            });
        }
       
    }
}