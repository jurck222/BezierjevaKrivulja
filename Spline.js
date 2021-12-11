import { Bezier } from "./Bezier.js";
import { Vector } from "./Vector.js";
export class Spline {
    constructor(beziers){
        this.spl=beziers;   
    }
    value(t){
        let nov=new Vector();
        let a = t;
        if(t<=1){
            nov= this.spl[0].value(a);
        }
        else{
            let b = t%1;
            let c = a-b;
            if (b===0){
                c=c-1;
                b=1;
            }
            if(c==this.spl.length){
                c=c-1;
                b=1;
            }
            let bez = this.spl[c]; 
            nov= bez.value(b);
        }
        return nov.kord;
    }
    derivative(t){
        let nov=new Vector();
        let a = t;
        if(t<=1){
            nov= this.spl[0].derivative(a);
        }
        else{
            let b = t%1;
            let c = a-b;
            if (b===0){
                b=1;
            }
            if(c==this.spl.length){
                c=c-1;
                b=1;
            }
            let bez = this.spl[c]; 
            nov= bez.derivative(b);
        }
        return nov.kord;
    }
    makeContinuous(){
        let rez = new Vector();
        let seznam = this.spl;
        let prvaTocka=new Vector();
        let drugaTocka=new Vector();
        for(let i = 0; i<seznam.length-1;i++){
            prvaTocka=seznam[i].p[seznam[i].p.length-1];
            drugaTocka=seznam[i+1].p[0];
            rez=prvaTocka.add(drugaTocka);
            rez=rez.divScalar(2);
            this.spl[i].p[seznam[i].p.length-1]=rez;
            this.spl[i+1].p[0]=rez;
        }
    }
    makeSmooth(){
        let rez = new Vector();
        let seznam = this.spl;
        let prvaTocka=new Vector();
        let p1_new = new Vector();
        let pn_new = new Vector();
        let drugaTocka=new Vector();
        for(let i = 0; i<seznam.length-1;i++){
            prvaTocka=seznam[i].derivative(1);
            drugaTocka=seznam[i].derivative(0);
            rez=prvaTocka.add(drugaTocka);
            rez=rez.divScalar(2);
            p1_new=rez.divScalar(seznam[i].p.length-1);
            p1_new=p1_new.add(seznam[i].p[0]);
            pn_new=rez.divScalar(seznam[i].p.length-1);
            pn_new=pn_new.negate();
            pn_new=pn_new.add(seznam[i].p[seznam[i].p.length-2]);
            this.spl[i].p[seznam[i].p.length-2]=pn_new;
            this.spl[i].p[1]=p1_new;
        }
    }
}
