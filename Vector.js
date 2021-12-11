export class Vector {

    constructor(coordinates) {
        this.kord = coordinates;
    }
    toString() {
        return `(${this.kord})`;
    }
    toArray() {
        return this.kord;
    }
    negate(){
        return this.mulScalar(-1);
    }
    add(v){
        let a = [];
        let seznam1=this.kord;
        let seznam2=v.kord;
        for(let i =0; i<seznam1.length;i++){  
            a[i]=seznam1[i]+seznam2[i];
        } 
        return new Vector(a);
    }
    subtract(v){
        let a = [];
        let seznam1=this.kord;
        let seznam2=v.kord;
        for(let i =0; i<seznam1.length;i++){  
            a[i]=seznam1[i]-seznam2[i];
        } 
        return new Vector(a);
    }
    mul(v){
        let a = [];
        let seznam1=this.kord;
        let seznam2=v.kord;
        for(let i =0; i<seznam1.length;i++){  
            a[i]=seznam1[i]*seznam2[i];
        } 
        return new Vector(a);
    }
    div(v){
        let a = [];
        let seznam1=this.kord;
        let seznam2=v.kord;
        for(let i =0; i<seznam1.length;i++){  
            a[i]=seznam1[i]/seznam2[i];
        } 
        return new Vector(a);
    }
    mulScalar(s){
        let seznam=this.kord; 
        for(let i =0; i<seznam.length;i++){  
            seznam[i]=seznam[i]*s;
        } 
        return new Vector(seznam);
    }
    divScalar(s){
        let seznam=this.kord; 
        for(let i =0; i<seznam.length;i++){  
            seznam[i]=seznam[i]/s;
        } 
        return new Vector(seznam);   
    }
    length(){
        let sum = 0;
        let seznam=this.kord;
        for(let i = 0; i<seznam.length; i++){
            sum += seznam[i]*seznam[i]; 
        }
        return Math.sqrt(sum);
    }
}

