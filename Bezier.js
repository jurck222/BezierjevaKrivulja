import { Bernstein } from "./Bernstein.js";
import { Vector } from "./Vector.js";

export class Bezier {
    constructor(p){
        this.p=p;   
    }
    value(t){
        let seznam = this.p;
        let r = [];
        let dolzina = seznam.length;
        let dolzina1 = seznam[0].kord.length;
        let c= [];
        let b= [];
        let a = 0;
        for(let i = 0; i<dolzina1;i++){
            b[i]=0;
            r[i]=0;
            c[i]=1;
        }
        let rv=new Vector(r);
        let sum = new Vector(b);
        let rez= new Vector(c);
        let n = dolzina-1;
        for(let i = 0; i <= dolzina-1;i++ ){
            let ber = new Bernstein(n,i);
            rez=seznam[i].subtract(rv);
            a=ber.value(t);
            sum=sum.add(rez.mulScalar(a));
        }
        return sum;
    }
    derivative(t){
        if(t>1){
            return null;
        }
        let seznam = this.p;
        let dolzina = seznam.length;
        let dolzina1 = seznam[0].kord.length;
        let c= [];
        let b= [];
        let a = 0;
        for(let i = 0; i<dolzina1;i++){
            b[i]=0;
            c[i]=1;
        }
        let sum = new Vector(b);
        let rez= new Vector(c);
        let n = dolzina-2;
        for(let i = 0; i <= dolzina-2;i++ ){
            let ber = new Bernstein(n,i);
            rez =seznam[i+1].subtract(seznam[i]);
            a=ber.value(t);
            sum=sum.add(rez.mulScalar(a));
        }
        return new Vector(sum.mulScalar(dolzina-1).kord);
    }
}
