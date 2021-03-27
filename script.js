class calc{
    constructor(ptext, ctext){
        this.ptext=ptext;
        this.ctext=ctext;
        this.clear();
    }
    clear(){
        this.cop='';
        this.pop ='';
        this.operation= undefined;
    }
    delete(){
        this.cop=this.cop.toString.slice(0, -1)
    }

    appendnum(number){
        if (number =='.' && this.cop.includes('.')) return
        this.cop=this.cop.toString() + number.toString()
    }
    chooseoperation(operation){
        if(this.cop=='') return
        if(this.pop!=''){
            this.compute()
        }
        this.operation=operation;
        this.pop=this.cop;
        this.cop=''

    }
    compute(){
        let computation;
        const prev=parseFloat(this.pop)
        const curr=parseFloat(this.cop)
        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operation){
            case '+':
                computation=prev +curr;
                break
            
            case '-':
                computation=prev -curr;
                break 

            case '*':
                computation=prev *curr;
                break  
                
            case '÷':
                computation=prev /curr;
                break
            default:
                return
             
        }
        this.cop=computation
        this.operation=undefined
        this.pop= ''

    }

    getdisplay(number){
        const stringnumber= number.toString()
        const integernumber= parseFloat(stringnumber.split('.')[0])
        const decimalnumber= stringnumber.split('.')[1]
        
       let integerdiplay;
       if(isNaN(integernumber)){
           integerdiplay=''
       }
       else{
           integerdiplay= integernumber.toLocaleString('en',{
               maximumFractionDigits:0 })
       }
       if(decimalnumber!=null){
           return `${integerdiplay}.${decimalnumber}`
       }
       else{
           return integerdiplay
       }

    }
    updatedisplay(){
        this.ctext.innerText=this.getdisplay(this.cop);
        if(this.operation!=null){
        this.ptext.innerText=
        `${this.getdisplay(this.pop)} ${this.operation}`;
        }
        else{
            this.ptext.innerText='';
        }
    }
    
}
    
const numbuttons=document.querySelectorAll('[numbers]');
const operationsbuttons= document.querySelectorAll('[operations]');
const delbutton= document.querySelector('[delete]');
const clrbutton= document.querySelector('[clear]');
const eqbutton= document.querySelector('[equal]');
const ptext= document.querySelector('[p-operand]');
const ctext= document.querySelector('[c-operand]');

const calculator= new calc(ptext, ctext)

numbuttons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendnum(button.innerText)
        calculator.updatedisplay()
    })
});

operationsbuttons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseoperation(button.innerText)
        calculator.updatedisplay()
    })
});

eqbutton.addEventListener('click', button=>{
    calculator.compute();
    calculator.updatedisplay();

})

clrbutton.addEventListener('click', button=>{
    calculator.clear();
    calculator.updatedisplay();

})

delbutton.addEventListener('click', button=>{
    calculator.delete();
    calculator.updatedisplay();

})



